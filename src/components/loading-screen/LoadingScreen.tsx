export default function LoadingScreen({ isLoaded } : { isLoaded : boolean}) {
    return (
        <div className = {`loading-screen ${isLoaded ? 'loading-screen--hidden' : ''}`}>
            <span className = 'text--large text--bold'>Loading...</span>
        </div>
    );
}