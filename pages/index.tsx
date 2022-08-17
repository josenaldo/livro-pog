import { Box, Container } from "@mui/material";

export default function Home() {
    const videoId = "FP9I_07p2dY";

    return (
        <Container>
            <Box
                my={4}
                sx={{
                    height: { xs: "90vh", md: "100%" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    itemsAlign: "flex-start",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        pb: "56.25%",
                        height: "0",
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <Box
                        component="iframe"
                        className="ratio ratio-16x9 "
                        frameBorder="0"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="autoplay;"
                        sx={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                        }}
                    ></Box>
                </Box>

                <Box
                    component="iframe"
                    src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${process.env.NEXT_PUBLIC_EMBED_DOMAIN}`}
                    frameBorder="0"
                    sx={{
                        flexGrow: "1",
                    }}
                />
            </Box>
        </Container>
    );
}
