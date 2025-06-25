// lib/hooks/useEasterEggs.ts
import { useEffect, useState } from "react";

export const useEasterEggs = () => {
	const [isNyanPlaying, setIsNyanPlaying] = useState(false);
	const [isGifPlaying, setIsGifPlaying] = useState(false);
	const [isSoundPlaying, setIsSoundPlaying] = useState(false);

	const triggerManyNyanCats = () => {
		if (isNyanPlaying) return;

		setIsNyanPlaying(true);

		for (let i = 0; i < 30; i++) {
			setTimeout(() => {
				const img = document.createElement("img");
				img.src =
					"https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif";
				img.className = "nyan-cat";
				img.style.position = "fixed";
				img.style.width = "200px";
				img.style.zIndex = "9999";
				img.style.transition = "transform 10s linear";
				img.style.top = Math.floor(Math.random() * 100) + "%";

				const fromLeft = Math.random() < 0.5;
				if (fromLeft) {
					img.style.left = "-200px";
					img.style.transform = "translateX(0)";
				} else {
					img.style.right = "-200px";
					img.style.transform = "translateX(0) scaleX(-1)";
				}

				document.body.appendChild(img);

				setTimeout(() => {
					if (fromLeft) {
						img.style.transform = "translateX(200vw)";
					} else {
						img.style.transform = "translateX(-200vw) scaleX(-1)";
					}
				}, 100);

				setTimeout(() => {
					img.remove();
				}, 10100);
			}, Math.random() * 2000);
		}

		setTimeout(() => {
			setIsNyanPlaying(false);
		}, 11000);
	};

	const triggerBugGif = () => {
		if (isGifPlaying) return;

		setIsGifPlaying(true);
		const gif = document.createElement("img");
		gif.src = "/cat.gif"; // Assure-toi que cat.gif est dans le dossier public
		gif.style.position = "fixed";
		gif.style.bottom = "0";
		gif.style.right = "0";
		gif.style.width = "150px";
		gif.style.zIndex = "9998";
		document.body.appendChild(gif);

		setTimeout(() => {
			gif.remove();
			setIsGifPlaying(false);
		}, 10000);
	};

	const triggerNokiaSound = () => {
		if (isSoundPlaying) return;

		setIsSoundPlaying(true);
		const audio = new Audio("/nokia.mp3"); // Assure-toi que nokia.mp3 est dans le dossier public
		audio.play().catch(console.error);

		audio.addEventListener("ended", () => {
			setIsSoundPlaying(false);
		});
	};

	const toggleTemporaryComic = () => {
		const title = document.getElementById("main-title");
		if (title && !title.classList.contains("comic-sans")) {
			title.classList.add("comic-sans");
			setTimeout(() => {
				title.classList.remove("comic-sans");
			}, 5000);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key.toLowerCase()) {
				case "n":
					triggerManyNyanCats();
					break;
				case "g":
					triggerBugGif();
					break;
				case "s":
					triggerNokiaSound();
					break;
				case "c":
					toggleTemporaryComic();
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isNyanPlaying, isGifPlaying, isSoundPlaying]);

	return {
		isNyanPlaying,
		isGifPlaying,
		isSoundPlaying,
		triggerManyNyanCats,
		triggerBugGif,
		triggerNokiaSound,
		toggleTemporaryComic,
	};
};
