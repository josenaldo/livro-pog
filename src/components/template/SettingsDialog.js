import {
    ButtonGroup,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Typography,
} from '@mui/material'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import TextFormatIcon from '@mui/icons-material/TextFormat'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { useConfig } from '@pog/contexts'

const SettingsDialog = ({ open, setOpen }) => {
    const {
        colorMode,
        toggleColorMode,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        COLOR_MODES,
    } = useConfig()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Configurações</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} padding={2}>
                    <Stack>
                        <Typography variant="subtitle1">
                            Tamanho da fonte
                        </Typography>
                        <Typography variant="caption">
                            Essa configuração só se aplica ao texto dos
                            capítulos
                        </Typography>
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            fullWidth
                        >
                            <Button
                                onClick={() => {
                                    decreaseFontSize()
                                }}
                            >
                                <TextDecreaseIcon />
                            </Button>
                            <Button
                                onClick={() => {
                                    resetFontSize()
                                }}
                            >
                                <TextFormatIcon />
                            </Button>
                            <Button
                                onClick={() => {
                                    increaseFontSize()
                                }}
                            >
                                <TextIncreaseIcon />
                            </Button>
                        </ButtonGroup>
                    </Stack>
                    <Stack>
                        <Typography variant="subtitle1">
                            Tipo de fonte
                        </Typography>
                        <Typography variant="caption">
                            Essa configuração só se aplica ao texto dos
                            capítulos
                        </Typography>
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            fullWidth
                        >
                            <Button>Serif</Button>
                            <Button>Sans</Button>
                        </ButtonGroup>
                    </Stack>
                    <Stack>
                        <Typography variant="subtitle1">Tema</Typography>
                        <Typography variant="caption">
                            Essa configuração se aplica a todo o site
                        </Typography>
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            fullWidth
                        >
                            <Button
                                disabled={colorMode === COLOR_MODES.dark}
                                onClick={() => {
                                    toggleColorMode()
                                }}
                            >
                                <DarkModeIcon />
                            </Button>
                            <Button
                                disabled={colorMode === COLOR_MODES.light}
                                onClick={() => {
                                    toggleColorMode()
                                }}
                            >
                                <LightModeIcon />
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export { SettingsDialog }
