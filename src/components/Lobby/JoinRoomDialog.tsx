// modules
import { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

// mui components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

const JoinRoomDialog = (props: {open: boolean, onClose: () => void}) => {
    const { open, onClose } = props;

    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const attemptJoinRoom = async (password: string) => {
        const res = await fetch("http://localhost:5000/api/room/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password })
        })
        const json = await res.json()
        if (res.ok) {
            console.log(json)
            navigate({
                pathname: "/room",
                search: createSearchParams({id: json._id}).toString()
            })
        }
        else {
            console.log(json.error)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Join Room</DialogTitle>
            <DialogContent>
                <TextField id="password" label="Password" variant="standard" onChange={(e) => setCode(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => attemptJoinRoom(code)}>Join</Button>
            </DialogActions>
        </Dialog>
    )
}

export default JoinRoomDialog