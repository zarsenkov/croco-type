import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Play, SkipForward, CheckCircle } from 'lucide-react';

// --- СПИСОК СЛОВ ДЛЯ ИГРЫ ---
const WORDS = [
  "Кофемашина", "Зубная паста", "Сноуборд", "Панда", "Электрический ток", 
  "Детектив", "Пицца", "Блогер", "Танцы", "Кот в сапогах", "Парашют", 
  "Микроскоп", "Дирижер", "Шаурма", "Космонавт", "Мокрая курица"
];

export default function App() {
  const [gameState, setGameState] = useState('start'); // Состояния: start, play
  const [currentWord, setCurrentWord] = useState(''); // Текущее слово
  const [score, setScore] = useState(0); // Счетчик угаданных слов

  // --- ФУНКЦИЯ ПОЛУЧЕНИЯ СЛОВА ---
  // Выбирает случайное слово из списка WORDS
  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setCurrentWord(WORDS[randomIndex]);
  };

  // --- НАЧАЛО ИГРЫ ---
  // Обнуляет очки и переключает экран
  const startGame = () => {
    getNewWord();
    setScore(0);
    setGameState('play');
  };

  // --- СЛОВО УГАДАНО ---
  // Увеличивает счет и дает новое слово
  const handleDone = () => {
    setScore(prev => prev + 1);
    getNewWord();
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        
        {/* ЭКРАН 1: СТАРТ */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            style={styles.card}
            className="neon-card"
          >
            <h1 style={styles.logo}>CROC<span style={{color: '#EAFF00'}}>O</span></h1>
            <p style={styles.rules}>Объясни слово жестами, не издавая ни звука!</p>
            <button style={styles.mainBtn} onClick={startGame}>
              ИГРАТЬ <Play fill="black" size={20} />
            </button>
          </motion.div>
        )}

        {/* ЭКРАН 2: ПРОЦЕСС ИГРЫ */}
        {gameState === 'play' && (
          <motion.div 
            key="play"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.card}
          >
            <div style={styles.scoreBadge}>ОЧКИ: {score}</div>
            
            <motion.div 
              key={currentWord}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={styles.wordBox}
            >
              <p style={styles.label}>ТВОЁ СЛОВО:</p>
              <h2 style={styles.wordText}>{currentWord}</h2>
            </motion.div>

            <div style={styles.actions}>
              <button style={styles.skipBtn} onClick={getNewWord}>
                <SkipForward size={24} />
              </button>
              <button style={styles.doneBtn} onClick={handleDone}>
                УГАДАНО <CheckCircle size={20} />
              </button>
            </div>

            <button style={styles.exitBtn} onClick={() => setGameState('start')}>
              <RefreshCw size={14} /> ВЫЙТИ В МЕНЮ
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- СТИЛИ ОБЪЕКТА (COMIC NEON) ---
const styles = {
  container: {
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    background: '#2D004F'
  },
  card: {
    background: 'white',
    border: '4px solid black',
    boxShadow: '8px 8px 0px #EAFF00',
    borderRadius: '40px',
    padding: '40px 25px',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
    position: 'relative'
  },
  logo: { fontSize: '48px', fontWeight: '900', marginBottom: '10px' },
  rules: { fontSize: '14px', fontWeight: '700', marginBottom: '40px', opacity: 0.7 },
  scoreBadge: { position: 'absolute', top: '-15px', right: '25px', background: 'black', color: 'white', padding: '5px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: '900' },
  wordBox: {
    background: '#EAFF00',
    border: '3px solid black',
    padding: '30px 10px',
    borderRadius: '25px',
    marginBottom: '25px'
  },
  label: { fontSize: '10px', fontWeight: '900', marginBottom: '8px', opacity: 0.5 },
  wordText: { fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', margin: 0 },
  actions: { display: 'flex', gap: '15px' },
  mainBtn: { width: '100%', background: '#EAFF00', border: '4px solid black', padding: '18px', borderRadius: '20px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  skipBtn: { flex: 1, background: '#FF7CC0', border: '3px solid black', borderRadius: '20px', padding: '15px', cursor: 'pointer' },
  doneBtn: { flex: 2, background: '#00F0FF', border: '3px solid black', borderRadius: '20px', padding: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  exitBtn: { marginTop: '30px', background: 'none', border: 'none', color: '#999', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '30px auto 0' }
};
