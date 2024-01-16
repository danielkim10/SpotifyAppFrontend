// modules
import { useState, useContext } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

// helpers
import { generateRoomCode } from '../../utilities/random'

// mui components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import useUserContext from '../../utilities/hooks/context/useUserContext'

const CreateRoomDialog = (props: {open: boolean, onClose: () => void}) => {
    const { open, onClose } = props;

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const user = useUserContext();

    const createRoom = async (name: string, description: string, password: string, id: string) => {
        const res = await fetch("http://localhost:5000/api/room/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description, owner: id, password: password })
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
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent>
                <TextField id="name" label="Room Name" variant="standard" required onChange={(e) => setName(e.target.value)}/>
                <TextField id="description" label="Description" variant="standard" multiline rows={3} onChange={(e) => setDescription(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => { createRoom(name, description, generateRoomCode(6), user.id) }}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRoomDialog