import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Button.module.scss';
import { Button} from '@mui/material';
import { FilePresent, ThirtyFpsOutlined } from '@mui/icons-material';
import soundEffect from '../../assets/test.mp3';


interface ButtonProps {
	timer: Date
}
interface TimeObj{
	
		"h":number,
		"m":number,
		"s":number
}

const ButtonComponent: FC<ButtonProps> = () => {
	const [enabled, setEnabled] = useState<boolean>(false);
	const [intervalKeeper, setIntervalKeeper] = useState<NodeJS.Timer>(null);
	const timeInSeconds= useRef<number>(0);
	const audioPlayer = useMemo<HTMLAudioElement>(() => new Audio(soundEffect), []);
	

	

	const timeObjectStart = useMemo<TimeObj>(() => {return{
		"h":0,
		"m":0,
		"s":0
}},[]);
	const [timeObject, setTimeObject] = useState<TimeObj>(timeObjectStart);
	
			
	const secondsToTime = useCallback((secs) =>{
		let hours = Math.floor(secs / (60 * 60));
	
		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);
	
		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		if(minutes % 59 === 0 && seconds === 59 && minutes !== 0){
			console.log("Time to play");
			audioPlayer.play();
		}
	
		let obj = {
			"h": hours,
			"m": minutes,
			"s": seconds
		};
		return obj;
	  },[audioPlayer]);

	const timerHandler = useCallback(() => {
		timeInSeconds.current = ++timeInSeconds.current;
		setTimeObject(secondsToTime(timeInSeconds.current));
	},[secondsToTime]);
	
	const startTimer = (useCallback(() => {
		if(enabled){
			clearInterval(intervalKeeper);
			setEnabled(!enabled);
		}
		else{
			setTimeObject(timeObjectStart);
			timeInSeconds.current = 0;
			setIntervalKeeper(setInterval(timerHandler, 1000));
			setEnabled(!enabled);
	}
	},[enabled, intervalKeeper, timeObjectStart, timerHandler]));

	const [button, setButton] = useState(<Button variant="outlined" onClick={startTimer}>Start session</Button>)

	const resetTime = () => {
		setTimeObject(timeObjectStart);
		timeInSeconds.current = 0;
	}



	  const timeFormatter= () =>{
		let formattedString = timeObject.h > 9 ? timeObject.h + ":" : "0" + timeObject.h + ":";
		formattedString += timeObject.m > 9 ? timeObject.m + ":" : "0" + + timeObject.m + ":";
		formattedString += timeObject.s > 9 ? timeObject.s + ":" : "0" + + timeObject.s;
		return formattedString;
		
	  }

	
	useEffect(() => {
		console.log("yuse: " + enabled);
		setButton(enabled ? <Button variant="contained" onClick={startTimer}>Stop</Button> : <Button variant="outlined" onClick={startTimer}>Start</Button>);
}	,[enabled, startTimer]);


	return (
		<>
		<div className="outer-container">
		<div className = "timer">{timeFormatter()}</div>
		<div>
			{button}
			<Button variant="contained" onClick={resetTime}>Reset</Button>
		</div>
		</div>
	</>
	);
};



export default ButtonComponent;
