import { useState } from 'react';
import StyledBackground from '../components/background/StyledBackground';
import ThinButton from '../components/buttons/ThinButton';
import '../components/logo/Banner.css';

export default function CreateVoteEditCandidate() {
  const [name, setName] = useState("Alexia Lebrun")
  const [description, setDescription] = useState("I LOVE DEVSOC!")

  return (
    <StyledBackground className='main'>
      <button className="text-white p-4 text-2xl absolute top-2 left-4 z-10">
        ←
      </button>
      
      <div className="w-full max-w-3xl mx-auto px-4 pt-16">
        <h1 className="title text-center mt-4 mb-8">Edit Candidate</h1>

        <div className="border-2 border-[#f1e9e9] bg-white/10 backdrop-blur-sm rounded-4xl p-6 md:p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-white text-lg">
                Candidate Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-white text-lg">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-md bg-white text-black"
              />
            </div>

            <div>
              <button type="button" className="flex items-center gap-2 text-white">
                <span>Add an image</span>
                <div className="bg-white/20 rounded-full p-1">
                  +
                </div>
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <ThinButton text="Save" margin="mt-2" />
            </div>
          </form>
        </div>
      </div>
    </StyledBackground>
  )
} 