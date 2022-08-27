import {
    Box,
    ButtonGroup,
    Button,
    IconButton,
    Drawer,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
} from '@mui/material'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useTheme } from '@mui/material/styles'

import { darkPalette, lightPalette } from '@pog/styles'
import { useColorMode } from '@pog/contexts'

const SettingsDialog = ({ open, setOpen }) => {
    const theme = useTheme()
    const { colorMode, toggleColorMode, COLOR_MODES } = useColorMode()

    const handleClose = () => {
        setOpen(false)
    }

    const handleChangeTheme = (palette) => {
        toggleColorMode()
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
                            <Button>
                                <TextDecreaseIcon />
                            </Button>
                            <Button>
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
                                    handleChangeTheme(darkPalette)
                                }}
                            >
                                <DarkModeIcon />
                            </Button>
                            <Button
                                disabled={colorMode === COLOR_MODES.light}
                                onClick={() => {
                                    handleChangeTheme(lightPalette)
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
