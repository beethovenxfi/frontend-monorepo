import useSound from 'use-sound'
import { StepType } from './lib'
import { useUserSettings } from '../../user/settings/UserSettingsProvider'

export function useTxSound() {
  const { allowSounds } = useUserSettings()

  const [playSuccessSound] = useSound('/sounds/gong.mp3')
  const [playRemoveSound] = useSound('/sounds/gong.mp3')

  const playTxSound = (stepType: StepType) => {
    if (allowSounds === 'no') return

    if (stepType === 'removeLiquidity') {
      playRemoveSound()
    } else {
      playSuccessSound()
    }
  }

  return { playTxSound }
}
