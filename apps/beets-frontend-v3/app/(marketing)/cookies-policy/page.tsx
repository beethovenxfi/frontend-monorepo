'use client'

import Link from 'next/link'
import { Box, Container } from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'

export default function Cookies() {
  return (
    <Container py="2xl">
      <Prose>
        <div className="pb-4">
          <FadeInOnView>
            <div className="subsection">
              <Box mt="3xl">
                <h1>Beets cookies&nbsp;policy</h1>
                <p>
                  <em>Last updated: October 6, 2026</em>
                </p>
              </Box>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div className="subsection">
              <h2>I. Introduction and scope of policy</h2>
              <p>
                This Cookies Policy (“Policy”) applies to your interaction with BeethovenX DAO LLC
                and material service providers operating under a legal agreement (“BeethovenX,”
                “Beets,” “we,” “our,” or “us”) when you use the beets.fi user interface (UI) for the
                Beets Protocol (“Site”). It covers cookies and other browser storage used to support
                the Site and its third-party services.
              </p>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div className="subsection">
              <h2>II. About cookies</h2>
              <p>
                Cookies are pieces of data stored on your device. Browser cookies are assigned by a
                web server to the browser on your device. When you return to a site you have visited
                before, your browser gives this data back to the server.
              </p>

              <p>
                The UI uses local browser storage to support its functionality. Local storage is
                stored on your device and, unlike cookies, is not automatically included with each
                request to a web server. The application may use stored values when connecting a
                wallet or preparing a transaction. Third-party providers may use cookies or similar
                technologies to provide and secure their services.
              </p>
              <p>
                Beets does not use analytics or tracking services, advertising trackers, or web
                beacons. The Site does not respond separately to “Do Not Track” signals communicated
                by your browser.
              </p>
              <p>
                Wallet, hosting, and API providers may process wallet-related information and
                network or request information needed for their services. Their use of cookies and
                similar technologies depends on the provider and the feature you use. Refer to their
                policies for details about their practices. Beets does not use these services for
                analytics, tracking, advertising, or affiliate promotional offers.
              </p>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div className="subsection">
              <h2>III. Managing cookies and browser storage</h2>

              <p>
                You can manage, clear, or block cookies and local storage through your browser
                settings. Clearing storage may reset preferences, wallet connection state, saved
                policy acceptance, and recent transaction history displayed by the UI. Blocking
                storage may affect these features. Clearing browser storage does not remove
                transactions recorded on the Sonic blockchain or data retained by service providers.
                Refer to your browser&apos;s documentation for instructions.
              </p>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div className="subsection">
              <h2>IV. Functional browser storage</h2>
              <p>
                The UI stores settings such as slippage tolerance and transaction preferences,
                wallet connection state, accepted policies, recent transactions, and certain cached
                data locally in your browser. These values support application functionality rather
                than tracking or advertising. Locally stored data may remain until cleared by you or
                the application.
              </p>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div className="subsection">
              <h2>V. Using information</h2>
              <p>
                Information is used to provide and maintain the Site, support wallet connections and
                transactions, troubleshoot issues, comply with legal obligations, and protect
                security. Service providers may temporarily cache requests and responses and retain
                operational logs needed to run and secure the UI. Beets does not maintain customer
                accounts or a personal-data database.
              </p>
            </div>
          </FadeInOnView>
          <FadeInOnView>
            <div>
              <h2>VI. Sharing</h2>
              <p>
                Information may be shared with service providers as needed to operate the Site and
                provide the features you use. When permitted or required by law, we may share
                information with additional third parties for purposes including responding to legal
                process. See our <Link href="privacy-policy">Privacy policy</Link> for more
                information about processing, sharing, and retention.
              </p>
            </div>
          </FadeInOnView>
        </div>
      </Prose>
    </Container>
  )
}
