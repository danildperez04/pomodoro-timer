interface Props {
  hours: string
  minutes: string
  seconds: string
}

function CounterDisplay({ hours, minutes, seconds }: Props) {
  return (
    <div className="flex gap-5 items-center text-4xl font-black text-white">
      <span className="bg-gray-400 px-4 py-2 rounded-lg">{hours}</span>
      :
      <span className="bg-gray-400 px-4 py-2 rounded-lg">{minutes}</span>
      :
      <span className="bg-gray-400 px-4 py-2 rounded-lg">{seconds}</span>
    </div>
  )
}

export default CounterDisplay