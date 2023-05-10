import { Button, Card, Container, Icon, IconButton, Typography } from "@mui/material";
import { Done, Delete, Cancel } from "@mui/icons-material";

function Todo({ index, todo, markComplete, deleteOne }) {
    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "5px",
        height: "100%",
    };

    return ( 
        <Container style={containerStyle}>
            <IconButton
            onClick={() => markComplete(index)}
            style={{ color: "#50fa7b" }}>
                {/* Cancel/done icons */}
                { todo.isDone ? <Cancel></Cancel> : <Done></Done>}
            </IconButton>

            {/* Todo Text, styled based on if it is done */}
            <Typography
                variant="h5"
                style={
                    todo.isDone 
                    ? {
                        textDecoration: "line-through",
                        color: "gray"
                      }
                    : {}
                }
            >
                {todo.content}
            </Typography>

            <IconButton 
                onClick={() => deleteOne(index)}
                style={{ color: "#ff5555" }}
            >
                <Delete></Delete>
            </IconButton>
        </Container>
     );
}

export default Todo;