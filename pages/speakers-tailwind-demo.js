
import React from 'react'

export default function Page() {
  return (
    <div className="md:flex bg-grey-200 rounded-lg p-10">
      <img
        className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        src={`images/speaker-component-1124.png`}
      />
      <div className="text-center md:text-left">
        <h2 className="text-lg font-bold">
          {'FirstName'} {'lastName'}
        </h2>
        <div className="text-purple-500">purple 500</div>
        <div className="text-gray-900">Conference Speaker</div>
        <div className="text-gray-600">{'bio'}</div>
      </div>
    </div>
  )
}
