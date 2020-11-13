import React, {useEffect} from 'react';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import childProcess from 'child_process'
import pify from 'pify'
//https://medium.com/the-z/the-making-of-a-wallpaper-changing-app-with-electron-and-vue-js-606e66b2a929
import wallpaper from 'wallpaper'
import fs from 'fs'
import hazardous from 'hazardous'
import path from 'path'
import { rootPath } from 'electron-root-path';

import electron from'electron';



let createProc = () => {
  console.log(process.execPath)
  let sp = childProcess.spawn(process.execPath, ['./renderer/lib/win/wallpaper.exe']);
  sp.unref();
  sp.on('error', (err) => {
    console.log('failed to start process',err);
  });
  sp.on('exit',(code, signal) => {
    console.log(`child process exited with code ${code}`);
    createProc();
  });
}

/*
const setWallpaper = async(opsys, img_src) => {
  const bin = '../lib/win/wallpaper.exe'
  if(opsys != "Windows"){
    const bin = '../lib/mac/wallpaper'
    console.log(opsys)
  }
  wallpaper.set('/images/psyduck-icon-2.jpg')
  console.log(rootPath)
  const configDir =  electron.app.getPath('userData');
  console.log(configDir);
  
  const stdout = await childProcess.execFile(bin, [img_src])
  console.log(stdout);
  
 //const stdout = childProcess.execFileSync('./paduck/renderer/lib/win/wallpaper.exe', ['./paduck/renderer/public/images/wallpaper.jpg'])
 const sh_path = path.join (__dirname, '/renderer/public/win/wallpaper.exe');
 console.log(sh_path)
 console.log(__dirname)
 console.log(__filename)

 //const stdout = await childProcess.execFile('/win/wallpaper.exe', ['/images/wallpaper.jpg'])
 //console.log(stdout)
}
*/
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);


const Fail = () => {
  const classes = useStyles({});
  useEffect(() => {
    let opsys = process.platform;
if (opsys == "darwin") {
    opsys = "MacOS";
} else if (opsys == "win32" || opsys == "win64") {
    opsys = "Windows";
} else if (opsys == "linux") {
    opsys = "Linux";
}
console.log(opsys)
//createProc()
//setWallpaper(opsys, '../public/images/wallpaper.jpg')

  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Paduck</title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          실패
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          아쉽게도 당신은 고라파덕의 선택을 받지 못했습니다.
        </Typography>
        <Typography gutterBottom>
          <Link href="/home">다시하기</Link>
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Fail;
