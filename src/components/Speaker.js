import React from 'react';
import SpeakerFavoriteButton from './SpeakerFavoriteButton';
import SpeakerImage from './SpeakerImage';
import ErrorBoundary from './ErrorBoundary';

const SpeakerComponent = ({
  id,
  bio,
  firstName,
  lastName,
  isFavorite, sat, sun,
  put,
  showErrorCard
}) => {

  // const timeStr = new Date().toLocaleTimeString();
  // console.log(`${timeStr} Speaker Render ${firstName} ${lastName}`);
  if (showErrorCard) {
    return (
      <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
        <div className="grid grid-cols-4 mb-6">
          <div className="font-bold text-lg col-span-3">Error Showing Speaker</div>

        </div>
        <div className="mb-6">
          
        </div>        
      </div>
    );


  }
  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={id}>
      <div className="grid grid-cols-4 mb-6">
        <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
        <div className="flex justify-end">
          <SpeakerFavoriteButton isFavorite={isFavorite}
            onFavoriteToggle={() => {
              put({ id, bio, firstName, lastName, isFavorite: !isFavorite, sat, sun })
            }} />
        </div>
      </div>
      <div className="mb-6">
        <SpeakerImage id={id} />
      </div>
      <div className="text-gray-600">{bio.substr(0, 70)}</div>
    </div>
  );
}




const Speaker = React.memo((props) => {
  return (
    <ErrorBoundary errorUI={<SpeakerComponent showErrorCard={true}/>}>
      <SpeakerComponent {...props} />
    </ErrorBoundary>
  )

});
Speaker.displayName = 'Speaker';


export default Speaker;