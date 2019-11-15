import React, {Component} from 'react';

import './stylesheets/faq.css';
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default class FAQ extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/">Back to Login</Link>
        <React.Fragment>
          <h2 align="center">Help</h2>
        </React.Fragment>
      <Accordion allowMultipleExpanded='true' allowZeroExpanded='true'>
        <AccordionItem>
          <AccordionItemHeading>
              <AccordionItemButton>
                  What is Cards Against Society?
              </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
              Cards Against Society is a party game for horrible people based on the real card game, Cards Against Humanity.
              <br/><br/>
              However, unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends. The game is simple. Each round, one player asks a question from a Black Card, and everyone else answers with their funniest White Card.
          </AccordionItemPanel>
      </AccordionItem>
      {/* */}
      <AccordionItem>
          <AccordionItemHeading>
              <AccordionItemButton>
                  How does one play Cards Against Humanities?
              </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
              One randomly chosen player begins as the Black Card Holder (BCH) and a randomly choesen Black Card is displayed. The Black Card Holder reads the question or fill-in-the-blank phrase on the Black Card out loud.<br/><br/>
              Every player besides the BCH will answer the the question or fills in the blank by submitting one White Card from their hand.<br/><br/>
              The submitted White Cards are shuffled and displayed, and then read by the current BCH. For full effect, the BCH should re-read the Black Card before presenting each White Card if all players are in a voice chat.<br/><br/>
              The BCH then picks their favorite White Card response, and whoever played that answer gains a point.
          </AccordionItemPanel>
        </AccordionItem>
        {/* */}
        <AccordionItem>
          <AccordionItemHeading>
              <AccordionItemButton>
                  As I handed my Dad his 50th birthday card, he looked at me with tears in his eyes and said...
              </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
              "You know, one would have been enough."
          </AccordionItemPanel>
        </AccordionItem>
        {/* */}
        <AccordionItem>
          <AccordionItemHeading>
              <AccordionItemButton>
                  Today, my son asked me "Can I have a book mark?" and I burst into tears.
              </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
              11 years old and he still doesn't know my name is Brian.
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      </React.Fragment>
    )
  }
}