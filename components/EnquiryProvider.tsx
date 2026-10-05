'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'

const MODELS = ['General enquiry', 'Réserve', 'Blanche', 'Sylve', 'Brume', 'Kente Gold Dress', 'Accra Midnight Diver', 'Volta Green Automatic', 'Cocoa Chronograph', 'Independence Blue GMT', 'Osu Skeleton Reserve']
const GOALS = ['Book private viewing', 'Order a current model', 'Source a classic reference']
const BUDGETS = ['Under GHS 100k', 'GHS 100k–250k', 'GHS 250k–500k', 'GHS 500k+']
const WINDOWS = ['Within 30 days', '1–3 months', '3–6 months', 'Flexible']
const CONDITIONS = ['Factory new', 'Certified pre-owned', 'Open to both']

type OpenArgs = {
  model?: string
  goal?: string
  budget?: string
  timeframe?: string
  condition?: string
}

const Ctx = createContext<{ open: (arg?: string | OpenArgs) => void }>({ open: () => {} })
export const useEnquiry = () => useContext(Ctx)

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [model, setModel] = useState(MODELS[0])
  const [goal, setGoal] = useState(GOALS[0])
  const [budget, setBudget] = useState(BUDGETS[1])
  const [timeframe, setTimeframe] = useState(WINDOWS[1])
  const [condition, setCondition] = useState(CONDITIONS[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [toastOn, setToastOn] = useState(false)
  const nameInput = useRef<HTMLInputElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = useCallback((m: string) => {
    setToastMsg(m); setToastOn(true)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastOn(false), 3800)
  }, [])

  const openModal = useCallback((arg?: string | OpenArgs) => {
    const cfg = typeof arg === 'string' ? { model: arg } : (arg ?? {})
    setStep(1)
    setModel(MODELS.includes(cfg.model ?? '') ? (cfg.model as string) : MODELS[0])
    setGoal(GOALS.includes(cfg.goal ?? '') ? (cfg.goal as string) : GOALS[0])
    setBudget(BUDGETS.includes(cfg.budget ?? '') ? (cfg.budget as string) : BUDGETS[1])
    setTimeframe(WINDOWS.includes(cfg.timeframe ?? '') ? (cfg.timeframe as string) : WINDOWS[1])
    setCondition(CONDITIONS.includes(cfg.condition ?? '') ? (cfg.condition as string) : CONDITIONS[0])
    setName('')
    setEmail('')
    setNotes('')
    setErrMsg('')
    setOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setOpen(false)
    setStep(1)
    setErrMsg('')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('locked', open)
    return () => document.documentElement.classList.remove('locked')
  }, [open])
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, closeModal])
  useEffect(() => {
    if (!open || step !== 2) return
    const t = window.setTimeout(() => nameInput.current?.focus(), 380)
    return () => window.clearTimeout(t)
  }, [open, step])

  const nextStep = (e: FormEvent) => {
    e.preventDefault()
    if (!goal || !budget || !timeframe || !condition) {
      setErrMsg('Please choose purchase goals before continuing.')
      return
    }
    setErrMsg('')
    setStep(2)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const okName = name.trim().length > 1
    const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!okName || !okMail) {
      setErrMsg('Please give us a name and a valid email.')
      return
    }
    setOpen(false)
    setStep(1)
    setName('')
    setEmail('')
    setNotes('')
    setErrMsg('')
    showToast(`Request received — ${goal.toLowerCase()} for ${model}. The Accra concierge will write within two days.`)
  }

  const value = useMemo(() => ({ open: openModal }), [openModal])

  return (
    <Ctx.Provider value={value}>
      {children}

      <div className={'modal' + (open ? ' open' : '')} role="dialog" aria-modal="true"
           aria-labelledby="mTitle" aria-hidden={!open}>
        <div className="modal-backdrop" onClick={closeModal} />
        <div className="modal-panel">
          <button className="modal-x" onClick={closeModal} aria-label="Close">✕</button>
          <p className="sec-label">Accra concierge</p>
          <h3 id="mTitle">{step === 1 ? 'Configure your order request.' : 'Confirm your contact details.'}</h3>
          <p className="m-sub">
            {step === 1
              ? 'Tell us what you want sourced or ordered, and we will match inventory before outreach.'
              : 'A specialist in Accra will follow up with exact availability, lead time and payment options.'}
          </p>

          <div className="funnel-steps" aria-hidden="true">
            <span className={'f-step' + (step === 1 ? ' on' : '')}>1 · Request</span>
            <span className={'f-step' + (step === 2 ? ' on' : '')}>2 · Contact</span>
          </div>

          <form onSubmit={step === 1 ? nextStep : submit} noValidate>
            {step === 1 ? (
              <>
                <label className="field"><span>Watch</span>
                  <select value={model} onChange={(e) => setModel(e.target.value)}>
                    {MODELS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </label>
                <label className="field"><span>Goal</span>
                  <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                    {GOALS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </label>
                <label className="field"><span>Budget range</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="field"><span>Timeline</span>
                  <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                    {WINDOWS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </label>
                <label className="field"><span>Condition preference</span>
                  <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                    {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                {errMsg && <p className="form-err">{errMsg}</p>}
                <button className="submit" type="submit">Continue <span>→</span></button>
              </>
            ) : (
              <>
                <label className="field"><span>Name</span>
                  <input ref={nameInput} value={name} onChange={(e) => setName(e.target.value)}
                         className={errMsg && name.trim().length <= 1 ? 'err' : ''}
                         type="text" autoComplete="name" placeholder="Kwame Mensah" />
                </label>
                <label className="field"><span>Email</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)}
                         className={errMsg && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'err' : ''}
                         type="email" autoComplete="email" placeholder="you@example.com" />
                </label>
                <label className="field"><span>Notes (optional)</span>
                  <input value={notes} onChange={(e) => setNotes(e.target.value)}
                         type="text" placeholder="Reference, bracelet size, or occasion" />
                </label>
                <p className="mini-brief">
                  {goal} · {budget} · {timeframe} · {condition}
                </p>
                {errMsg && <p className="form-err">{errMsg}</p>}
                <div className="submit-row">
                  <button className="submit alt" type="button" onClick={() => { setStep(1); setErrMsg('') }}>Back</button>
                  <button className="submit" type="submit">Send request <span>→</span></button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* kept mounted so the CSS transition can play in both directions */}
      <div className={'toast' + (toastOn ? ' show' : '')} role="status">{toastMsg}</div>
    </Ctx.Provider>
  )
}
