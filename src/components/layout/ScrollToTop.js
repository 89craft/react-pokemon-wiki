import React, { useEffect, useState } from 'react'
import { AiOutlineToTop } from 'react-icons/ai'

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false)

	function toggleVisibility() {
		if (window.pageYOffset > 400) setIsVisible(true)
		else setIsVisible(false)
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
	}, [])

	return (
		isVisible && (
			<div
				className="btn btn-outline-dark"
				style={{
					position: 'fixed',
					bottom: '0.5em',
					right: '0.5em',
					padding: '0',
				}}
				onClick={scrollToTop}
				role="button"
			>
				<AiOutlineToTop style={{ width: '3em', height: '3em' }} />
			</div>
		)
	)
}
