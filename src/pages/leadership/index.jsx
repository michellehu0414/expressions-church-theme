import React from "react";
import ReactDOM from "react-dom/client";
import "./leadership.scss";
import PageBanner from "@components/PageBanner/PageBanner";

const PageBannerSection = () => {
    return (
        <PageBanner
            backgroundImage="path/to/image.jpg"
            titleOutlinedText="Welcome"
            titleFilledText="to our site"
            primaryButtonText="Get Started"
            primaryButtonLink="/get-started"
            secondaryButtonText="Learn More"
            secondaryButtonLink="/learn-more"
            showPrimaryButton={true}
            showSecondaryButton={true}
        />
    );
};

const injectComponent = (Component, elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        const root = ReactDOM.createRoot(element);
        root.render(<Component />);
    }
};

// Inject each section where its placeholder div exists
// injectSection(IntroSection, "intro-section");

injectComponent(PageBannerSection, "page-header");