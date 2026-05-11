import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

// Adresse du serveur Socket.IO
const SERVER_URL = "http://localhost:3002";

export default function VideoRoom() {

    // Recuperation du roomId dans l'URL
    const { roomId } = useParams();

    // References videos
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // References socket et WebRTC
    const socketRef = useRef(null);
    const peerRef = useRef(null);

    // Stockage du stream local utilisateur
    const localStreamRef = useRef(null);

    // Etats interface
    const [connected, setConnected] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);

    useEffect(() => {

        // Fonction principale
        const start = async () => {

            // Connexion au serveur socket
            const socket = io(SERVER_URL, {
                transports: ["websocket"],
            });

            socketRef.current = socket;

            // Quand le socket est connecte
            socket.on("connect", async () => {

                setConnected(true);

                // Demande acces camera + micro
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                // Sauvegarde stream local
                localStreamRef.current = stream;

                // Affichage video locale
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // Rejoindre la room
                socket.emit("join-room", {
                    roomId,
                    userId: socket.id,
                    userName: "Utilisateur",
                });
            });

            // Quand un utilisateur rejoint
            socket.on("user-joined", async () => {

                const peer = createPeerConnection();

                peerRef.current = peer;

                // Ajout des tracks audio/video
                localStreamRef.current.getTracks().forEach((track) => {
                    peer.addTrack(track, localStreamRef.current);
                });

                // Creation de l'offre
                const offer = await peer.createOffer();

                await peer.setLocalDescription(offer);

                // Envoi de l'offre
                socket.emit("offer", {
                    roomId,
                    offer,
                });
            });

            // Reception de l'offre
            socket.on("offer", async ({ offer }) => {

                const peer = createPeerConnection();

                peerRef.current = peer;

                // Ajout des tracks locales
                localStreamRef.current.getTracks().forEach((track) => {
                    peer.addTrack(track, localStreamRef.current);
                });

                // Ajout description distante
                await peer.setRemoteDescription(
                    new RTCSessionDescription(offer)
                );

                // Creation reponse
                const answer = await peer.createAnswer();

                await peer.setLocalDescription(answer);

                // Envoi reponse
                socket.emit("answer", {
                    roomId,
                    answer,
                });
            });

            // Reception de la reponse
            socket.on("answer", async ({ answer }) => {

                if (peerRef.current) {

                    await peerRef.current.setRemoteDescription(
                        new RTCSessionDescription(answer)
                    );
                }
            });

            // Reception ICE candidate
            socket.on("ice-candidate", async ({ candidate }) => {

                if (peerRef.current && candidate) {

                    await peerRef.current.addIceCandidate(
                        new RTCIceCandidate(candidate)
                    );
                }
            });

            // Si deconnexion socket
            socket.on("disconnect", () => {
                setConnected(false);
            });
        };

        start();

        // Nettoyage quand on quitte la page
        return () => {

            // Stop camera et micro
            localStreamRef.current?.getTracks().forEach((track) =>
                track.stop()
            );

            // Fermer connexion WebRTC
            peerRef.current?.close();

            // Deconnexion socket
            socketRef.current?.disconnect();
        };

    }, [roomId]);

    // Creation connexion WebRTC
    const createPeerConnection = () => {

        const peer = new RTCPeerConnection({

            // Serveurs STUN Google
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
            ],
        });

        // Envoi des ICE candidates
        peer.onicecandidate = (event) => {

            if (event.candidate) {

                socketRef.current.emit("ice-candidate", {
                    roomId,
                    candidate: event.candidate,
                });
            }
        };

        // Reception stream distant
        peer.ontrack = (event) => {

            if (remoteVideoRef.current) {

                remoteVideoRef.current.srcObject =
                    event.streams[0];
            }
        };

        return peer;
    };

    // Activer ou desactiver camera
    const toggleCamera = () => {

        const videoTrack =
            localStreamRef.current?.getVideoTracks()[0];

        if (!videoTrack) return;

        videoTrack.enabled = !videoTrack.enabled;

        setCameraOn(videoTrack.enabled);
    };

    // Activer ou desactiver micro
    const toggleMic = () => {

        const audioTrack =
            localStreamRef.current?.getAudioTracks()[0];

        if (!audioTrack) return;

        audioTrack.enabled = !audioTrack.enabled;

        setMicOn(audioTrack.enabled);
    };

    // Quitter appel video
    const endCall = () => {

        localStreamRef.current?.getTracks().forEach((track) =>
            track.stop()
        );

        peerRef.current?.close();

        socketRef.current?.disconnect();

        // Retour accueil
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6">

            <h1 className="text-3xl font-bold mb-2">
                Video Room
            </h1>

            <p className="mb-6 text-sm text-muted-foreground">
                Room ID: {roomId} -{" "}
                {connected ? "Connecte" : "Deconnecte"}
            </p>

            {/* Zone videos */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Camera locale */}
                <div className="bg-card border rounded-xl p-4">

                    <h2 className="mb-3 font-semibold">
                        Ma camera
                    </h2>

                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full rounded-xl bg-black"
                    />
                </div>

                {/* Camera distante */}
                <div className="bg-card border rounded-xl p-4">

                    <h2 className="mb-3 font-semibold">
                        Camera distante
                    </h2>

                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-xl bg-black"
                    />
                </div>
            </div>

            {/* Boutons controle */}
            <div className="flex gap-3 mt-6">

                <button
                    onClick={toggleMic}
                    className="px-4 py-2 rounded-lg bg-primary text-white"
                >
                    {micOn
                        ? "Couper micro"
                        : "Activer micro"}
                </button>

                <button
                    onClick={toggleCamera}
                    className="px-4 py-2 rounded-lg bg-primary text-white"
                >
                    {cameraOn
                        ? "Couper camera"
                        : "Activer camera"}
                </button>

                <button
                    onClick={endCall}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white"
                >
                    Terminer
                </button>
            </div>
        </div>
    );
}