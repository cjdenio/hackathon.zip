import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { Page, Snippet } from "@geist-ui/core";
import type { GetServerSideProps } from "next";

import HackathonLayout from "@/components/layouts/organizer/OrganizerLayout";
import FeatureInfo from "@/components/organizer/FeatureInfo";
import { Terminal } from "@geist-ui/react-icons";
import type { Hackathon } from "@prisma/client";
import type { ReactElement } from "react";

export default function Hackathon({
  hackathon
}: {
  hackathon: Hackathon | null;
}): any {
  if (!hackathon) {
    return (
      <>
        <Page>404: Not Found!</Page>
      </>
    );
  }

  if (!hackathon.integrateEnabled)
    return (
      <Page>
        <FeatureInfo
          featureKey="integrateEnabled"
          featureName="Integrations"
          featureDescription={
            <>
              Bring your own infrastructure, add external plugins, and integrate
              with&nbsp;our&nbsp;API.
            </>
          }
          featureIcon={Terminal}
          hackathonSlug={hackathon.slug}
        />
      </Page>
    );

  return (
    <>
      <Page>
        <h1>Integrate</h1>
        <h3>Your API Key</h3>
        <Snippet
          symbol=""
          text="kEpdOYlpKAQPOooPkVsonHcNorJtKx"
          width="350px"
        />
      </Page>
    </>
  );
}

Hackathon.getLayout = function getLayout(page: ReactElement) {
  return <HackathonLayout>{page}</HackathonLayout>;
};

export const getServerSideProps = (async (context) => {
  const { userId } = getAuth(context.req);

  console.log({ userId });

  if (context.params?.slug) {
    const hackathon = await prisma.hackathon.findUnique({
      where: {
        slug: context.params?.slug.toString(),
        OR: [
          {
            ownerId: userId ?? undefined
          },
          {
            collaboratorIds: {
              has: userId
            }
          }
        ]
      }
    });
    return {
      props: {
        hackathon
      }
    };
  } else {
    return {
      props: {
        hackathon: null
      }
    };
  }
}) satisfies GetServerSideProps<{
  hackathon: Hackathon | null;
}>;
