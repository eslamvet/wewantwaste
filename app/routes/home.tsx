import {
  Container,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  Step,
  StepButton,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import SkipSize from "~/components/SkipSize";
import { HomeSteps } from "~/utils/constants";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import type { SkipOption } from "~/types/skip-option";
import BottomSheet from "~/components/BottomSheet";

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
  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 4,
        pb: { xs: selectedSkipSize ? 25 : 4, sm: selectedSkipSize ? 15 : 4 },
      }}
    >
      <Stepper
        activeStep={activeStep}
        sx={{ flexWrap: "wrap", gap: { xs: 2, sm: 0 } }}
        connector={
          <StepConnector
            sx={{
              [`&.${stepConnectorClasses.completed}`]: {
                [`& .${stepConnectorClasses.line}`]: {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        }
      >
        {HomeSteps.map(({ label, icon: StepIcon }, index) => {
          return (
            <Step
              key={label}
              completed={index <= activeStep}
              sx={{ flex: { xs: 1, sm: "unset" } }}
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
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: ".85rem", sm: "1.25rem" },
                  }}
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
              skipOptions={skipOptions}
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
