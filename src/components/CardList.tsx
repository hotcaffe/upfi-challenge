import { Grid, GridItem, VStack, Image, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <Grid templateColumns="repeat(3, 1fr)" gap='40px' >
        {cards.map(card => (
          <GridItem key={card.id} w="293px" h="290px" backgroundColor='gray.800' borderRadius='6px'>
            <Image src={card.url} borderRadius='6px 6px 0 0'/>
            <VStack align='flex-start' justify='center' h='100px' mx='25px' spacing={1}>
              <Text fontWeight='bold' fontSize='2xl' color='gray.50'>{card.title}</Text>
              <Text color='gray.100'>{card.description}</Text>
            </VStack>
          </GridItem>
        ))}
        {/* <GridItem w="293px" h="290px" bg="blue.500" borderBox='6px'>

        </GridItem>
        <GridItem w="293px" h="290px" bg="blue.500"></GridItem>
        <GridItem w="293px" h="290px" bg="blue.500"></GridItem>
        <GridItem w="293px" h="290px" bg="blue.500"></GridItem>
        <GridItem w="293px" h="290px" bg="blue.500"></GridItem>
        <GridItem w="293px" h="290px" bg="blue.500"></GridItem> */}
      </Grid>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
