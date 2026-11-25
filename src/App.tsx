import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NightCanvas, type CanvasMood } from './components/NightCanvas';
import { TopBar } from './components/TopBar';
import { CoverStage } from './components/stages/CoverStage';
import { ThoughtsStage } from './components/stages/ThoughtsStage';
import { QuestionsStage } from './components/stages/QuestionsStage';
import { ThermometerStage } from './components/stages/ThermometerStage';
import { SimulatorStage } from './components/stages/SimulatorStage';
import { ClosingStage } from './components/stages/ClosingStage';
import type { DecisionChoice, StageId } from './data/content';

const STORAGE_KEY = 'fisica-biologia-luna-v1';

interface PersistedState {
  lastStage: StageId;
  visitedStages: StageId[];
  chapterIndex: number;
  savedQuestionIds: string[];
  thermometerAnswers: Record<string, number>;
  simulatorFeelings: Partial<Record<DecisionChoice, string[]>>;
}

const DEFAULT_STATE: PersistedState = {
  lastStage: 'cover',
  visitedStages: ['cover'],
  chapterIndex: 0,
  savedQuestionIds: [],
  thermometerAnswers: {},
  simulatorFeelings: {},
};

function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      visitedStages: Array.isArray(parsed.visitedStages) ? parsed.visitedStages : ['cover'],
      savedQuestionIds: Array.isArray(parsed.savedQuestionIds) ? parsed.savedQuestionIds : [],
      thermometerAnswers:
        parsed.thermometerAnswers && typeof parsed.thermometerAnswers === 'object'
          ? parsed.thermometerAnswers
          : {},
      simulatorFeelings:
        parsed.simulatorFeelings && typeof parsed.simulatorFeelings === 'object'
          ? parsed.simulatorFeelings
          : {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export default function App() {
  const [state, setState] = useState<PersistedState>(loadState);
  const [stage, setStage] = useState<StageId>('cover');
  const [menuOpen, setMenuOpen] = useState(false);
  const [canvasPaused, setCanvasPaused] = useState(false);
  const [simMood, setSimMood] = useState<CanvasMood>('neutral');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in private mode
    }
  }, [state]);

  const navigateTo = useCallback((target: StageId) => {
    setStage(target);
    setState((prev) => ({
      ...prev,
      lastStage: target,
      visitedStages: prev.visitedStages.includes(target)
        ? prev.visitedStages
        : [...prev.visitedStages, target],
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleQuestion = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      savedQuestionIds: prev.savedQuestionIds.includes(id)
        ? prev.savedQuestionIds.filter((q) => q !== id)
        : [...prev.savedQuestionIds, id],
    }));
  }, []);

  const handleThermometerAnswer = useCallback((itemId: string, value: number) => {
    setState((prev) => ({
      ...prev,
      thermometerAnswers: { ...prev.thermometerAnswers, [itemId]: value },
    }));
  }, []);

  const handleResetThermometer = useCallback(() => {
    setState((prev) => ({ ...prev, thermometerAnswers: {} }));
  }, []);

  const handleSaveFeelings = useCallback((choice: DecisionChoice, emotions: string[]) => {
    setState((prev) => ({
      ...prev,
      simulatorFeelings: { ...prev.simulatorFeelings, [choice]: emotions },
    }));
  }, []);

  const handleResetSimulator = useCallback(() => {
    setState((prev) => ({ ...prev, simulatorFeelings: {} }));
  }, []);

  const handleResetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    setStage('cover');
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const activeMood: CanvasMood =
    stage === 'simulator'
      ? simMood
      : stage === 'closing'
        ? 'warm'
        : stage === 'questions'
          ? 'biology'
          : 'neutral';

  const hasSavedProgress =
    state.lastStage !== 'cover' && state.visitedStages.length > 1;

  return (
    <div className="relative min-h-[100dvh] bg-[#070b12] text-[#eef2f7]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[#eef2f7] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#070b12]"
      >
        Ir al contenido
      </a>

      <NightCanvas mood={activeMood} paused={canvasPaused} />

      <TopBar
        currentStage={stage}
        visitedStages={state.visitedStages}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onSelectStage={navigateTo}
        onResetAll={handleResetAll}
        canvasPaused={canvasPaused}
        onToggleCanvasPaused={() => setCanvasPaused((p) => !p)}
      />

      <main id="main-content" className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {stage === 'cover' && (
              <CoverStage
                onStart={() => navigateTo('thoughts')}
                hasProgress={hasSavedProgress}
                onResume={() => navigateTo(state.lastStage)}
              />
            )}

            {stage === 'thoughts' && (
              <ThoughtsStage
                chapterIndex={state.chapterIndex}
                onChangeChapter={(idx) =>
                  setState((prev) => ({ ...prev, chapterIndex: idx }))
                }
                onNextStage={() => navigateTo('questions')}
              />
            )}

            {stage === 'questions' && (
              <QuestionsStage
                savedIds={state.savedQuestionIds}
                onToggleSave={handleToggleQuestion}
                onNextStage={() => navigateTo('thermometer')}
              />
            )}

            {stage === 'thermometer' && (
              <ThermometerStage
                answers={state.thermometerAnswers}
                onAnswer={handleThermometerAnswer}
                onReset={handleResetThermometer}
                onNextStage={() => navigateTo('simulator')}
              />
            )}

            {stage === 'simulator' && (
              <SimulatorStage
                feelingsByChoice={state.simulatorFeelings}
                onSaveFeelings={handleSaveFeelings}
                onResetSimulator={handleResetSimulator}
                onMoodChange={setSimMood}
                onNextStage={() => navigateTo('closing')}
              />
            )}

            {stage === 'closing' && <ClosingStage onJumpTo={navigateTo} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
