interface LayoutProps {
    loadModal   : React.ReactNode;
    header      : React.ReactNode;
    map         : React.ReactNode;
    panel       : React.ReactNode;
}

export function DesktopLayout({loadModal, header, map, panel} : LayoutProps) {
    return(
        <main className = 'app'>
            {loadModal}
            {header}
            {map}
            {panel}
        </main>
    );
}

export function MobileLandscapeLayout({loadModal, header, map, panel} : LayoutProps) {
    return (
        <main className = 'app app__mobile app__mobile--landscape'>
            {loadModal}
            <div className = 'layout--horizontal'>
                <div className = 'layout--vertical'>
                    {header}
                    {map}
                </div>
                {panel}
            </div>
        </main>
    );
}

export function MobileLayout({loadModal, header, map, panel} : LayoutProps) {
    return (
        <main className = 'app app__mobile'>
            {loadModal}
            {header}
            {map}
            {panel}
        </main>
    );
}