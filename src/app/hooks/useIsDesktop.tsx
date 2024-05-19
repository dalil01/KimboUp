import { useState, useEffect } from "react";

export default function useIsDesktop() {

	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();
		const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

		setIsDesktop(!isMobile);
	}, []);

	return isDesktop;

}