import React, { useState, useRef, useEffect } from 'react';
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';


const Chatbot = () => {
    const [activeAgent, setActiveAgent] = useState(null);
    const [isListening, setIsListening] = useState(false); //speech recognititon
    const [transcript, setTranscript] = useState(''); //speech recognititon
    const recognitionRef = useRef(null); //speech recognititon
    const [sessionStarted, setSessionStarted] = useState(false);
    const [shouldWiggle, setShouldWiggle] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    useEffect(() => {
        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                setTranscript(prev => prev + ' ' + transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // wiggle effect to indicate to users START SESSION button needs to be pressed first
    useEffect(() => {
        let interval;
        if (!sessionStarted) {
            interval = setInterval(() => {
                setShouldWiggle(true);
                setTimeout(() => setShouldWiggle(false), 1000);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [sessionStarted]);

    const toggleListening = () => {
        if (recognitionRef.current) {
            if (isListening) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
                setIsListening(true);
            }
        }
    };
    // End of speech recognition section

    const toggleAgent = (agentName) => {
        setActiveAgent(activeAgent === agentName ? null : agentName);
    };

    const startSession = () => {
        setSessionStarted(true);
        setTranscript(''); // Clear any previous transcript
        setActiveAgent(null); // Reset active agent
    };

    const endSession = () => {
        setSessionStarted(false);
        setTranscript(''); // Clear the transcript
        setActiveAgent(null); // Reset active agent
        if (isListening) {
            recognitionRef.current.stop(); // Stop speech recognition if active
            setIsListening(false);
        }
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    return (
        <div className="chat-container">
            {/* Sidebar Section */}
            <div className="sidebar">
                {/* Sidebar Toggle */}
                <div className="d-flex align-items-center sidebar-toggle mb-3">
                    <img src="/images/sidebarleft.svg" alt="Toggle Sidebar" className="me-2" style={{ width: '25px' }} />
                    {/* Search Icon */}
                    <div className="search-toggle">
                        <img src="/images/search.svg" alt="Search bot" style={{ width: '25px' }} />
                    </div>
                    <div className="search-toggle">
                        <img src="/images/gear-fill.svg" alt="Settings Icon" style={{ width: '25px' }} />
                    </div>
                </div>
                <h2>Chat Agents</h2>
                <ul className="agent-list">
                    <li className={`agent-item ${activeAgent === 'EMMA' ? 'active' : ''} ${!sessionStarted ? 'disabled' : ''}`}>
                        <div className="agent-header" onClick={() => sessionStarted && toggleAgent('EMMA')}>
                            <div className="agent-image">
                                <img src="/images/emma.jpg" alt="Emma" />
                            </div>
                            <span className="agent-name">EMMA</span>
                            <span className="dropdown-arrow">{activeAgent === 'EMMA' ? '▼' : '▶'}</span>
                        </div>
                        <div className={`agent-description ${activeAgent === 'EMMA' ? 'show' : ''}`}>
                            Nurturing and focuses on trauma based responses
                        </div>
                    </li>
                    <li className={`agent-item ${activeAgent === 'JARVIS' ? 'active' : ''} ${!sessionStarted ? 'disabled' : ''}`}>
                        <div className="agent-header" onClick={() => sessionStarted && toggleAgent('JARVIS')}>
                            <div className="agent-image">
                                <img src="/images/jarvis.jpg" alt="Jarvis" />
                            </div>
                            <span className="agent-name">JARVIS</span>
                            <span className="dropdown-arrow">{activeAgent === 'JARVIS' ? '▼' : '▶'}</span>
                        </div>
                        <div className={`agent-description ${activeAgent === 'JARVIS' ? 'show' : ''}`}>
                            Logical and focuses on direct problem solving
                        </div>
                    </li>
                    <li className={`agent-item ${activeAgent === 'CORTANA' ? 'active' : ''} ${!sessionStarted ? 'disabled' : ''}`}>
                        <div className="agent-header" onClick={() => sessionStarted && toggleAgent('CORTANA')}>
                            <div className="agent-image">
                                <img src="/images/cortana.png.webp" alt="Cortana" />
                            </div>
                            <span className="agent-name">CORTANA</span>
                            <span className="dropdown-arrow">{activeAgent === 'CORTANA' ? '▼' : '▶'}</span>
                        </div>
                        <div className={`agent-description ${activeAgent === 'CORTANA' ? 'show' : ''}`}>
                            Intuitive and focuses on being empathetic in her answers
                        </div>
                    </li>
                    <li className={`agent-item ${activeAgent === 'ULTRON' ? 'active' : ''} ${!sessionStarted ? 'disabled' : ''}`}>
                        <div className="agent-header" onClick={() => sessionStarted && toggleAgent('ULTRON')}>
                            <div className="agent-image">
                                <img src="/images/ultron.jpg.webp" alt="Ultron" />
                            </div>
                            <span className="agent-name">ULTRON</span>
                            <span className="dropdown-arrow">{activeAgent === 'ULTRON' ? '▼' : '▶'}</span>
                        </div>
                        <div className={`agent-description ${activeAgent === 'ULTRON' ? 'show' : ''}`}>
                            Experimental and offers out of the box answers
                        </div>
                    </li>
                </ul>

                {/* agent list styles */}
                <style>
                    {`
                    .agent-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    .agent-item {
                        margin: 10px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        overflow: hidden;
                    }
                    .agent-header {
                        display: flex;
                        align-items: center;
                        padding: 10px;
                        background-color: white;
                    }
                    .agent-item:hover {
                        border-color: #007bff;
                    }
                    .agent-image {
                        width: 40px;
                        height: 40px;
                        margin-right: 15px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .agent-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .agent-name {
                        font-size: 16px;
                        font-weight: 500;
                        flex-grow: 1;
                    }
                    .dropdown-arrow {
                        margin-left: 10px;
                        font-size: 12px;
                        color: #666;
                    }
                    .agent-description {
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.3s ease-out;
                        background-color: #f8f9fa;
                        padding: 0 15px;
                        font-size: 14px;
                        color: #666;
                    }
                    .agent-description.show {
                        max-height: 100px;
                        padding: 10px 15px;
                    }
                    .agent-item.active {
                        border-color: #007bff;
                    }
                    .agent-item.disabled {
                        opacity: 0.5;
                        pointer-events: none;
                    }
                    .agent-item.disabled .agent-header {
                        cursor: not-allowed;
                    }
                    `}
                </style>
            </div>
            
            {/* Main Chatbox Section */}
            <div className="main-chat">
                {/* User Account Section */}
                <div className="user-profile-container">
                    <div className="user-account">
                        <div className="user-image-placeholder"></div>
                        <div className="user-name-circle">
                            <button className="user-button" onClick={toggleUserDropdown}>USER</button>
                            {showUserDropdown && (
                                <div className="user-dropdown">
                                    <button className="dropdown-item">Home</button>
                                    <button className="dropdown-item">Settings</button>
                                    <button className="dropdown-item">Log Out</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="edit-profile-button">
                        <div className="svg-circle">
                            <img className="Write" src="/images/pencilbox.svg" alt="Write" style={{ width: '25px' }} />
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="chat-header1">
                    <h1>Welcome back, USER</h1>
                </div>
                <div className="text-center mt-3">
                    {sessionStarted ? (
                        <>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-block btn-lg custom-end-btn"
                                onClick={endSession}
                            >
                                End Session
                            </button>
                            <p className="session-status mt-2">Session Started</p>
                        </>
                    ) : (
                        <button 
                            type="submit" 
                            className={`btn btn-purple btn-block btn-lg custom-start-btn ${shouldWiggle ? 'wiggle' : ''}`}
                            onClick={startSession}
                        >
                            Start Session
                        </button>
                    )}
                </div>

                {/* Chat Input Section */}
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder={sessionStarted ? "Message Chosen Chat Agent" : "Please start a session to chat"} 
                        style={{ color: 'rgb(0, 0, 0)' }} 
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        disabled={!sessionStarted}
                    />
                    <button 
                        className={`csound-button mt-3 ${isListening ? 'listening' : ''}`}
                        onClick={sessionStarted ? toggleListening : undefined}
                        disabled={!sessionStarted}
                    >
                        <img src="/images/csoundtransparent.png" alt="CSound" />
                    </button>
                    <button className="send-button" disabled={!sessionStarted}>
                        <img src="/images/send.svg" alt="Send Message" />
                    </button>
                </div>
            </div>

            <style>
                {`
                .user-profile-container {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 8px;
                    width: auto;
                }

                .user-account {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-image-placeholder {
                    width: 35px;
                    height: 35px;
                    background-color: #f0f0f0;
                    border-radius: 50%;
                }

                .user-name-circle {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    border: 2px solid #8A2BE2;
                    border-radius: 20px;
                    background-color: white;
                    overflow: visible;
                }

                .user-button {
                    background: none;
                    border: none;
                    padding: 6px 15px;
                    font-weight: 500;
                    color: #333;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .user-button:hover {
                    background-color: rgba(138, 43, 226, 0.1);
                    color: #8A2BE2;
                }

                .user-button:focus {
                    outline: none;
                }

                .edit-profile-button {
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                }

                .svg-circle {
                    border: 2px solid #8A2BE2;
                    border-radius: 50%;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .svg-circle:hover {
                    background-color: rgba(138, 43, 226, 0.1);
                }

                .edit-profile-button img {
                    width: 25px;
                    height: 25px;
                }

                .main-chat {
                    position: relative;
                }

                .csound-button {
                    background: none;
                    border: none;
                    padding: 0 px;
                    cursor: pointer;
                    transition: opacity 0.2s;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 10px;
                }

                .csound-button:hover {
                    opacity: 0.8;
                }

                .csound-button img {
                    height: 50px;
                    width: auto;
                }

                .session-status {
                    color: #4B0082;
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin-bottom: 0;
                }

                .custom-end-btn {
                    padding: 15px 40px;
                    font-size: 1.25rem;
                    min-width: 250px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    background-color: #dc3545;
                    border-color: #dc3545;
                    color: white;
                    transition: all 0.3s ease;
                }

                .custom-end-btn:hover {
                    background-color: #c82333;
                    border-color: #bd2130;
                    transform: scale(1.05);
                }

                .custom-end-btn:active, .custom-end-btn:focus {
                    background-color: #bd2130 !important;
                    border-color: #b21f2d !important;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
                }

                .custom-start-btn {
                    padding: 15px 40px;
                    font-size: 1.25rem;
                    min-width: 250px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                }

                .btn-purple {
                    background-color: #4B0082;
                    border-color: #4B0082;
                    color: white;
                }

                .btn-purple:hover {
                    background-color: rgba(75, 0, 130, 0.7);
                    border-color: #4B0082;
                    color: black;
                    transform: scale(1.05);
                }

                .btn-purple:active, .btn-purple:focus {
                    background-color: rgba(75, 0, 130, 0.8) !important;
                    border-color: #4B0082 !important;
                    color: black !important;
                    box-shadow: 0 0 0 0.2rem rgba(75, 0, 130, 0.25) !important;
                }

                .csound-button.listening {
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .chat-input input:disabled {
                    background-color: #b399ff;
                    cursor: not-allowed;
                }

                .send-button:disabled {
                    height: 40px;
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .csound-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .csound-button:disabled img {
                    opacity: 0.5;
                }

                @keyframes wiggle {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(5deg); }
                    100% { transform: rotate(0deg); }
                }

                .custom-start-btn.wiggle {
                    animation: wiggle 0.5s ease-in-out;
                }

                .chat-input {
                    background-color: #b399ff!important;
                }

                .user-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 5px;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    min-width: 150px;
                }

                .dropdown-item {
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    border: none;
                    background: none;
                    text-align: left;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .dropdown-item:hover {
                    background-color: #f8f9fa;
                    color: #8A2BE2;
                }

                .dropdown-item:first-child {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                .dropdown-item:last-child {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                `}
            </style>
        </div>
    );
};

export default Chatbot;

