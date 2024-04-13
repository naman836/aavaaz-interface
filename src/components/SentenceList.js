import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const initialSentences = [
//     {  text: "How are you feeling today?", translation: "आज आप कैसे महसूस कर रहे हैं?", isCorrect: null },
//     {  text: "I've been experiencing chest pain.", translation: "मुझे सीने में दर्द हो रहा है।", isCorrect: null },
//     {  text: "Have you been taking any medication?", translation: "क्या आपने कोई दवा ली है?", isCorrect: null },
//     {  text: "Okay, I'll get them done.", translation: "ठीक है, मैं करा लूंगा।", isCorrect: null },
//     {  text: "I'll make sure to drink plenty of water.", translation: "मैं यह सुनिश्चित करूंगा कि मैं बहुत सारा पानी पीता हूँ।", isCorrect: null },
//     {  text: "I'll try to eat light.", translation: "मैं हल्का खाने की कोशिश करूंगा।", isCorrect: null },
//     {  text: "I'll make sure to rest.", translation: "मैं सुनिश्चित करूंगा कि मैं आराम करूं।", isCorrect: null },
//     {  text: "I have a headache.", translation: "मुझे सिरदर्द है।", isCorrect: null },
//     {  text: "Do you have any allergies?", translation: "क्या तुम्हें कोई एलर्जी है?", isCorrect: null },
//     {  text: "I'll prescribe some tests.", translation: "मैं कुछ टेस्ट लिखूंगा।", isCorrect: null },
//     {  text: "Drink plenty of water.", translation: "बहुत पानी पिएं।", isCorrect: null },
//     {  text: "Avoid heavy meals.", translation: "भारी भोजन से बचें।", isCorrect: null },
//     {  text: "Contact me if you feel worse.", translation: "अगर तुम्हें और बुरा लगे तो मुझसे संपर्क करें।", isCorrect: null },
//     {  text: "I'll keep that in mind.", translation: "मैं यह ध्यान में रखूंगा।", isCorrect: null },
//     {  text: "Thank you, doctor.", translation: "धन्यवाद, डॉक्टर।", isCorrect: null }
  
//   ];
const SentenceList = () => {
    const [sentences, setSentences] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newTranslation, setNewTranslation] = useState("");

    useEffect(() => {
        fetchSentences();
    }, []);

    const fetchSentences = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sentences'); // Updated endpoint URL
            if (response.data.length > 0) {
                setSentences(response.data);
            }
        } catch (error) {
            console.error('Error fetching sentences:', error);
        }
    };

    const handleCorrect = async (id) => {
        const sentenceToUpdate = sentences.find(s => s.id === id);
        if (!sentenceToUpdate) return;

        try {
            await axios.put(`https://aavaaz-interface.onrender.com/api/sentences/${id}`, {
                
                hindi: sentenceToUpdate.translation,
                Corrected: "YES corrected yet",
                isUpdated:false
            });
            fetchSentences(); // Refresh sentences after updating
            alert("Clicked")
        } catch (error) {
            console.error('Failed to mark as correct:', error);
        }
    };

    const handleIncorrect = (id) => {
        setEditId(id);
    };

    const handleUpdateTranslation = async () => {
        const sentenceToUpdate = sentences.find(s => s.id === editId);
        if (!sentenceToUpdate) return;

        try {
            await axios.put(`https://aavaaz-interface.onrender.com/api/sentences/${editId}`, {
                hindi: newTranslation,
                Corrected: "YES corrected yet",
                isUpdated:true
            });
            fetchSentences(); // Refresh sentences after updating
            setEditId(null);
            setNewTranslation("");
            alert("Clicked")
        } catch (error) {
            console.error('Failed to update translation:', error);
        }
    };

    return (
        <div>
            {sentences.map((sentence) => (
                <div key={sentence.id} className="sentence-container">
                    <p>Sentence: {sentence.text}</p>
                    <p>Translation: {sentence.translation}</p>
                    {editId === sentence.id ? (
                        <div>
                            <input
                                value={newTranslation}
                                onChange={(e) => setNewTranslation(e.target.value)}
                                type="text"
                            />
                            <button onClick={handleUpdateTranslation}>Submit</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleCorrect(sentence.id)} style={{ color: 'green' }}>Correct</button>
                            <button onClick={() => handleIncorrect(sentence.id)} style={{ color: 'red' }}>Incorrect</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SentenceList;
