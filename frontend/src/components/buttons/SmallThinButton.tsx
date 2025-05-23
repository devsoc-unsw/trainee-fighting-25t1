interface SmallThinButtonProps {
	text: string,
	margin: string,
    onClick?: () => void
}

export default function SmallThinButton({ text, margin, onClick }: SmallThinButtonProps) {
	return (
		<div className={`flex justify-center ${margin}`}>
			<button onClick={onClick} className="max-w-[45vw] w-[23em] h-[2.5em] border-1 border-[#f1e9e9] rounded-4xl text-[#f1e9e9] bg-white/20 cursor-pointer">
				{text}
			</button>
		</div>
	);
}