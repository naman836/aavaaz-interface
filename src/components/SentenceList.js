import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SentenceList = () => {
    const [sentences, setSentences] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newTranslation, setNewTranslation] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchSentences();
    }, []);

    const fetchSentences = async () => {
        try {
            const response = await axios.get('https://aavaaz-interface.onrender.com/api/sentences');
            if (response.data.length > 0) {
                setSentences(response.data);
            }
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching sentences:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const handleCorrect = async (id) => {
        const sentenceToUpdate = sentences.find(s => s.id === id);
        if (!sentenceToUpdate) return;

        try {
            await axios.put(`https://aavaaz-interface.onrender.com/api/sentences/${id}`, {
                hindi: sentenceToUpdate.translation,
                Corrected: "YES corrected yet",
                isUpdated: false
            });
            fetchSentences();
            alert("Awesome😊!");
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
                isUpdated: true
            });
            fetchSentences();
            setEditId(null);
            setNewTranslation("");
            alert("Sentence Successfully Updated!");
        } catch (error) {
            console.error('Failed to update translation:', error);
        }
    };

    return (
        <div>
            {loading ? ( // Conditionally render loading indicator
                <div>Loading...</div>
            ) : (
                sentences.map((sentence) => (
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
                ))
            )}
        </div>
    );
}

export default SentenceList;
