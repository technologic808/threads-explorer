'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import './home.css'
import { Button, TextField, Typography } from '@mui/material';
import { Add, KeyboardReturn } from '@mui/icons-material';

export default function Home() {
  const [groupCode, setGroupCode] = useState('');
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/group/${groupCode}`);
  };

  return (
    <>
      <div className='headline'>♾️ threads to explore</div>
      <div>
        <Typography className='header' variant="body1" gutterBottom margin={3}>
          Already have a group code?
        </Typography>
        <TextField
          className='form-element'
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(e) } }}
          placeholder="Enter group code"
        />
        <Button className='form-element submit-button' variant="contained" onClick={handleSubmit} ><KeyboardReturn /></Button>
      </div>

      <Typography className='header' variant="body1" gutterBottom margin={3}>
        Get Started with Threads Explorer
      </Typography>
      <div className='form-element'>
        <Button startIcon={<Add />} variant="contained" onClick={() => router.push('/group/create')}>Create a Group</Button>
      </div>

    </>
  );
}