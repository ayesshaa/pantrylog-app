'use client'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/navigation'
import {signOut} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, IconButton, useMediaQuery } from '@mui/material'
import { auth, firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Home() {

  const [user] = useAuthState(auth)
  const router = useRouter()
  const userSession = localStorage.getItem('user')
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  if (!user || !userSession){
    router.push('/home')
  }

 


  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('1')


  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    const lowercaseitem = item.toLowerCase()
    console.log(lowercaseitem)
    const docRef = doc(collection(firestore, 'inventory'), lowercaseitem)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    await deleteDoc(docRef)
    await updateInventory()
  }

  const defineQuantity = async (item, quantity) => {
    if (!item || quantity <= 0) {
      return;
    }

    const lowercaseitem = item.toLowerCase()
    const docRef = doc(collection(firestore, 'inventory'), lowercaseitem)
    console.log(lowercaseitem)
    await setDoc(docRef, {quantity: quantity})
    await updateInventory()
  }

  // const chatModel = new ChatOpenAI({
  //   apiKey: API_KEY 
  // })

  // const generateRecipes= async(prompt) => {
  //   prompt = `Generate three recipes for a ${prompt} dish. The output should be in JSON array and each object should contain a recipe name field named 'name', description field named 'description', and array of step by step instructions named 'instructions'. `
  //   const response = await chatModel.invoke(prompt)
  //   console.log(response)
  // }

  

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      paddingTop="6%"
    >
      <Typography 
        variant={isSmallScreen ? 'h3' : 'h1'} 
        color="#333" 
        paddingBottom="3%" 
        paddingTop="6%" // Add padding to the top
      >
        Pantry Log
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          signOut(auth);
          localStorage.removeItem('user');
        }}
      >
        Log Out
      </Button>
      <Box border="1px solid #333" bgcolor="#D7ECF3" width={isSmallScreen ? '90%' : 'auto'}>
        <Box
          width="100%"
          height="100px"
          bgcolor="#92CBDE"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderBottom="1px solid #333"
        >
          <Typography sx={{ fontWeight: 'bold' }} variant={isSmallScreen ? 'h4' : 'h3'} color="#333" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="auto"
          margin={2}
          gap={2}
          paddingRight={'3%'}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">Add Item</Typography>
            <TextField
              label="Item"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth={isSmallScreen}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">Quantity</Typography>
            <TextField
              id="outlined-basic"
              label="1, 2, 3 ..."
              variant="outlined"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              fullWidth={isSmallScreen}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={() => {
              defineQuantity(itemName, parseInt(itemQuantity));
              setItemName('');
              setItemQuantity('1');
            }}
          >
            Add
          </Button>
        </Box>

        <Stack
          width="100%"
          height="500px"
          spacing={2}
          overflow="auto"
          marginY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="90%"
              minHeight="140px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={3}
              border="1px solid #333"
              borderRadius={2}
              flexDirection={isSmallScreen ? 'column' : 'row'}
            >
              <Box>
                <Typography variant="h4" color="#333" textAlign="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Box>
              <Box
                justifySelf="flex-end"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                flexDirection={isSmallScreen ? 'column' : 'row'}
              >
                <IconButton
                  aria-label="add button"
                  size="large"
                  onClick={() => {
                    addItem(name);
                    setItemName('');
                  }}
                >
                  <AddCircleIcon style={{ fontSize: '2.5rem' }} />
                </IconButton>
                <Typography variant="h4" color="#333" textAlign="center">
                  {quantity}
                </Typography>
                <IconButton aria-label="remove button" onClick={() => removeItem(name)}>
                  <RemoveCircleIcon style={{ fontSize: '2.5rem' }} />
                </IconButton>
                <IconButton aria-label="delete button" size="large" onClick={() => deleteItem(name)}>
                  <DeleteIcon style={{ fontSize: '2.5rem' }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  
)
}