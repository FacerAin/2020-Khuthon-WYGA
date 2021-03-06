import React, {useEffect} from 'react';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import childProcess from 'child_process'
//https://medium.com/the-z/the-making-of-a-wallpaper-changing-app-with-electron-and-vue-js-606e66b2a929
import path from 'path'
import electron from'electron';
const isProd = process.env.NODE_ENV === 'production';

const remote = electron.remote || false;

/*
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
*/

/*
TODO: 경로 이슈 정리
const stdout = await childProcess.execFile('./renderer/public/win/wallpaper.exe', ['./renderer/public/images/wallpaper.jpg'])
 onsole.log(stdout)
 현재 위 문법으로 디버깅 환경에서 바탕화면 변경 가능

 하지만 빌드하게 되면 위 경로가 먹히지 않음

 빌드시 리소스 파일은 
 ...\paduck\dist\win-unpacked\resources\app\app
 으로 가게됨
 따라서 위 경로만 지정해줄 수 있다면 본 이슈는 해결

 따라서 찾아본 방법
 __dirname, path.join(), app.getPath() 등이 있음
--- 
 그리고 현재 윈도우에 대해서만 작업
 mac에 대해서는 mac/wallpaper 실행하면 됨 
 아래 코드 참고하여 인자 설정할 것
 	const arguments_ = [
		'set',
		path.resolve(imagePath),
		'--screen',
		screen,
		'--scale',
		scale
	];

	await execFile(binary, arguments_);


*/

//img_src에는 images 폴더 안의 이름만 작성
// Ex) wallpaper.jpg
const setWallpaper = async(opsys, img_name) => {
  console.log(opsys)
  let bin = '/win/wallpaper.exe'
  if(opsys != "Windows"){ //For Mac
    bin = '/mac'
  }
  let sh_path = ''
  let img_path = ''
  const AppPath = electron.remote.app.getAppPath()
  console.log(isProd)

  if(isProd){
    sh_path = path.join (AppPath ,'/app' ,bin);
    img_path = path.join (AppPath, '/app/images', img_name)
  }else{
    sh_path = path.join (AppPath, '/renderer/public/' + bin);
    img_path = path.join (AppPath,'/renderer/public/images/' + img_name )
  }

  if(opsys != "Windows")
  {
      if(isProd){
          sh_path = path.join (AppPath ,'/app' ,bin);
          img_path = path.join (AppPath, '/app/images', img_name)
      }else{
          sh_path = path.join (AppPath, '/renderer/public/' + bin);
          img_path = path.join (AppPath,'/renderer/public/images/' + img_name )
      }

      const str = 'wallpaper set '.concat(img_path);
      await childProcess.exec("cd "+sh_path);
      const stdout = await childProcess.exec(str)
      console.log(stdout)
  }
  else
  {
      const stdout = await childProcess.execFile(sh_path, [img_path])
      console.log(stdout)
  }
}

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
if (opsys == "darwin") { //운영체제 별 분기 처리 코드 활용할 것
    opsys = "MacOS";
} else if (opsys == "win32" || opsys == "win64") {
    opsys = "Windows";
} else if (opsys == "linux") {
    opsys = "Linux";
}
setWallpaper(opsys, 'wallpaper.jpg')

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
