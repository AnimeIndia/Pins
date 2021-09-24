import React, { MouseEvent, useState } from 'react';
import Link from 'next/link';
import { AppBar, Box, Button, Toolbar, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { NextRouter, useRouter } from 'next/router';


async function randomizeBg(event: MouseEvent, wrapperSetRandomIllustImageUrl: any) {
  event.preventDefault();
    wrapperSetRandomIllustImageUrl.wrapperSetRandomIllustImageUrl();
}

const NavbarMui = (wrapperSetRandomIllustImageUrl: any) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = (router: NextRouter, word: string) => {
    const href = '/search/' + word;
    router.push(href);
  }

  return (
  
  <div className="rankBarMui p-4 bg-gray-900">

    <Box className="flex px-40  gap-x-2 w-full ">
    <AppBar position="static">
    <Toolbar disableGutters={true} className="bg-gray-900">

      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Link href="/">
        <Button className="flex transition normal-case hover:bg-transparent px-10 py-3 rounded text-lg font-normal text-white text-left border-none">
          Home</Button>
      </Link>
      <a href="/rank" className="border-none">
        <Button className="flex transition normal-case hover:bg-transparent px-10 py-3 rounded text-lg font-normal text-white text-left border-none">
          Pins</Button>
      </a>
      <div className="">
        <Link href="/news">
            <Button className="transition normal-case hover:bg-transparent bg-transparent  px-10 py-3 rounded text-lg font-normal text-white text-left border-none">
              News</Button>
        </Link>
      </div>

      
    <div className="flex-1 items-end ">
      <Box className="transition normal-case hover:opacity-60 bg-gray-700 opacity-30 rounded-lg"
      sx={{backgroundColor: 'black',
       }}>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" className="normal-case bg-gray text-white"
        onClick={() => {handleSearch(router, value)}}
      >
        <SearchIcon />
      </IconButton>
      
      
      <InputBase className="text-white font-normal text-lg"
        sx={{ ml: 1, flex: 1, width:'50ch', }}
        size="medium"
        placeholder="Search Illusts"
        inputProps={{ 'aria-label': 'search illusts' }}
        onKeyDown={(event) => {if(event.key == 'Enter') { setValue(value); handleSearch(router, (event.target as HTMLInputElement).value); }}}
      />
      </Box>
      </div>

      <Link href="/">
        <Button className="flex transition normal-case hover:bg-transparent bg-transparent px-10 py-3 text-lg rounded font-normal text-white border-none text-right"
          onClick={(event) => randomizeBg(event, wrapperSetRandomIllustImageUrl)}>
          Randomize</Button>
      </Link>
      <Link href="#">
        <Button className="flex transition normal-case hover:bg-transparent bg-transparent px-10 py-3 text-lg rounded font-normal text-white border-none text-right">
          Sign-In</Button>
      </Link>
      </Toolbar> 
    </AppBar>
    </Box>

  </div>
      
      
  );
}

export { NavbarMui };
