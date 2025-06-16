import {
  Container,
  Stepper,
  StepConnector,
  Step,
  StepButton,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import SkipSize from "~/components/SkipSize/";
import { HomeSteps } from "~/utils/constants";
import type { Route } from "../../+types/root";
import { useEffect, useMemo, useState } from "react";
import type { SkipOption } from "~/types/skip-option";
import BottomSheet from "~/components/BottomSheet";
import styles from "./style";

export async function loader() {
  const skipOptionsRes = await fetch(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );
  const skipOptions = await skipOptionsRes.json();
  return skipOptions;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Business Skip Hire" },
    {
      name: "description",
      content:
        "Affordable and reliable business skip hire services for commercial waste disposal. Choose from a range of skip sizes with flexible hire periods and fast delivery.",
    },
  ];
}

export default function Home({
  loaderData: skipOptions,
}: Route.ComponentProps) {
  const [activeStep, setActiveStep] = useState(2);
  const [selectedSkipSize, setSelectedSkipSize] = useState<SkipOption | null>(
    null
  );
  useEffect(() => {
    setSelectedSkipSize(
      JSON.parse(localStorage.getItem("selected-skip-size") ?? "null")
    );
  }, []);

  const customStyles = useMemo(
    () => styles(selectedSkipSize),
    [selectedSkipSize]
  );

  return (
    <Container maxWidth="lg" sx={customStyles.container}>
      <Stepper
        activeStep={activeStep}
        sx={customStyles.stepper}
        connector={<StepConnector sx={customStyles.stepperConnector} />}
      >
        {HomeSteps.map(({ label, icon: StepIcon }, index) => {
          return (
            <Step
              key={label}
              completed={index <= activeStep}
              sx={customStyles.step}
            >
              <StepButton
                icon={
                  <StepIcon
                    color={index <= activeStep ? "primary" : "disabled"}
                  />
                }
              >
                <Typography
                  variant="body1"
                  sx={customStyles.stepBtnText}
                  color={index <= activeStep ? "text.primary" : "text.disabled"}
                >
                  {label}
                </Typography>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === HomeSteps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          {activeStep == 2 && (
            <SkipSize
              skipOptions={skipOptions!}
              selectedSkipSize={selectedSkipSize}
              setSelectedSkipSize={setSelectedSkipSize}
            />
          )}
        </Fragment>
      )}
      <BottomSheet selectedSkipSize={selectedSkipSize} />
    </Container>
  );
}
