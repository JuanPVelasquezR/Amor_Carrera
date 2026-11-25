import { AnimatePresence, motion } from 'framer-motion';
import { Check, Menu, Pause, Play, RotateCcw, X } from 'lucide-react';
import { STAGES, type StageId } from '../data/content';

interface TopBarProps {
  currentStage: StageId;
  visitedStages: StageId[];
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSelectStage: (stage: StageId) => void;
  onResetAll: () => void;
  canvasPaused: boolean;
  onToggleCanvasPaused: () => void;
}

export function TopBar({
  currentStage,
  visitedStages,
  menuOpen,
  onToggleMenu,
  onSelectStage,
  onResetAll,
  canvasPaused,
  onToggleCanvasPaused,
}: TopBarProps) {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const progress = currentIndex <= 0 ? 0.04 : currentIndex / (STAGES.length - 1);
  const stageMeta = STAGES[currentIndex];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 safe-pt">
        {/* Hairline progress bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.06]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#6aa9ff] via-[#d9b872] to-[#52e0b7]"
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </div>

        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {currentStage !== 'cover' ? (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#070b12]/80 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[11px] font-medium tracking-wider text-[#d9b872]">
                  {stageMeta.number}
                </span>
                <span className="truncate text-xs font-medium text-[#d7e0ec]">
                  {stageMeta.shortLabel}
                </span>
              </div>
            ) : (
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7f8fa6]">
                Física × Biología
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCanvasPaused}
              aria-label={canvasPaused ? 'Reanudar fondo animado' : 'Pausar fondo animado'}
              title={canvasPaused ? 'Reanudar fondo' : 'Pausar fondo'}
              className="btn-base btn-secondary !min-h-[44px] w-11 !rounded-full !p-0 text-[#9fb0c7]"
            >
              {canvasPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls="stage-menu-drawer"
              aria-label={menuOpen ? 'Cerrar índice de secciones' : 'Abrir índice de secciones'}
              className="btn-base btn-secondary !min-h-[44px] !rounded-full px-3.5 text-xs"
            >
              {menuOpen ? (
                <>
                  <X className="h-4 w-4" />
                  <span>Cerrar</span>
                </>
              ) : (
                <>
                  <Menu className="h-4 w-4" />
                  <span>Índice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="stage-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Índice del recorrido"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#070b12]/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pt-4 pb-8">
              <div className="flex h-14 items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#7f8fa6]">
                  Recorrido · Luna
                </span>
                <button
                  type="button"
                  onClick={onToggleMenu}
                  aria-label="Cerrar menú"
                  className="btn-base btn-secondary !min-h-[44px] !rounded-full px-3.5 text-xs"
                >
                  <X className="h-4 w-4" />
                  <span>Cerrar</span>
                </button>
              </div>

              <p className="mt-2 text-sm text-[#98a6bc]">
                Puedes seguir el orden paso a paso o saltar directamente a la parte que quieras volver a ver.
              </p>

              <nav aria-label="Secciones" className="mt-5 flex flex-col gap-2.5 overflow-y-auto">
                {STAGES.map((stage) => {
                  const isCurrent = stage.id === currentStage;
                  const isVisited = visitedStages.includes(stage.id);
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        onSelectStage(stage.id);
                        onToggleMenu();
                      }}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`btn-base w-full !justify-between rounded-2xl border px-4 py-3.5 text-left ${
                        isCurrent
                          ? 'border-[#d9b872]/50 bg-[#d9b872]/10 text-[#eef2f7]'
                          : 'border-white/10 bg-[#0d1421]/80 text-[#cfd9e6] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`mt-0.5 text-xs font-semibold tracking-wider ${
                            isCurrent ? 'text-[#d9b872]' : 'text-[#7f8fa6]'
                          }`}
                        >
                          {stage.number}
                        </span>
                        <div>
                          <div className="text-sm font-medium leading-snug">{stage.title}</div>
                          <div className="mt-0.5 text-xs text-[#8d9db4]">{stage.subtitle}</div>
                        </div>
                      </div>
                      {isVisited && !isCurrent && (
                        <Check className="h-4 w-4 shrink-0 text-[#52e0b7]" />
                      )}
                      {isCurrent && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#d9b872]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => {
                    onResetAll();
                    onToggleMenu();
                  }}
                  className="btn-base btn-secondary w-full text-xs text-[#9fb0c7]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reiniciar marcas y simulador</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
