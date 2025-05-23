import { useState } from 'react';
import StyledBackground from '../components/background/StyledBackground';
import ThinButton from '../components/buttons/ThinButton';
import '../components/logo/Banner.css';
import editIcon from '../assets/svg/edit.svg';
import binIcon from '../assets/svg/bin.svg';

export default function CreateVoteAddInfo() {
  const [candidates, setCandidates] = useState(["Alexia Lebrun", "Patrick Cooper", "Lina Pasquier", "Timothy Stevens"])
  const [newCandidate, setNewCandidate] = useState("")
  const [positionName, setPositionName] = useState("Treasurer")

  const addCandidate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newCandidate.trim()) {
      setCandidates([...candidates, newCandidate])
      setNewCandidate("")
    }
  }

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  return (
    <StyledBackground className='main'>
      <button className="text-white p-4 text-2xl absolute top-2 left-4 z-10">
        ←
      </button>
      
      <div className="w-full max-w-3xl mx-auto px-4 pt-16">
        <h1 className="title text-center mt-4 mb-8">Add Position</h1>

        <div className="border-2 border-[#f1e9e9] bg-white/10 backdrop-blur-sm rounded-4xl p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="position" className="text-white text-lg">
                Position Name
              </label>
              <input
                id="position"
                type="text"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="voting-type" className="text-white text-lg">
                Voting Type
              </label>
              <select
                id="voting-type"
                className="w-full p-3 rounded-md bg-white text-black focus:outline-none"
              >
                <option value="" disabled selected>
                  Select a voting type
                </option>
                <option value="first-past-the-post">First-past-the-post (Only one preference)</option>
                <option value="preferential">Preferential (Numbered preferences)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-white text-lg">Candidates</label>

              <div className="space-y-3">
                {candidates.map((candidate, index) => (
                  <div key={index} className="flex items-center justify-between border border-[#f1e9e9] bg-white/5 rounded-full px-4 py-3">
                    <div className="flex-grow text-center text-white">
                      {candidate}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1.5 border border-[#f1e9e9] bg-white/5 rounded-md">
                        <img src={editIcon} alt="Edit" className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 border border-[#f1e9e9] bg-white/5 rounded-md" 
                        onClick={() => removeCandidate(index)}
                      >
                        <img src={binIcon} alt="Delete" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <input
                  type="text"
                  value={newCandidate}
                  onChange={(e) => setNewCandidate(e.target.value)}
                  onKeyDown={addCandidate}
                  placeholder="Type a name to add..."
                  className="w-full px-6 py-3 bg-white/5 border border-[#f1e9e9] rounded-full text-white placeholder-white/70 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <ThinButton text="Continue" margin="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </StyledBackground>
  )
}
