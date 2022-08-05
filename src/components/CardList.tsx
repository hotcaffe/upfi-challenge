import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
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
  const {isOpen, onClose, onOpen} = useDisclosure();

  const [modalImage, setModalImage] = useState("");

  const handleModalImage = (url: string): void => {
    setModalImage(url);
    onOpen();
  } 

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap='40px' >
        {cards && cards.map(card => (
          <GridItem key={card.id} w="293px" h="290px" backgroundColor='gray.800' borderRadius='6px' cursor='pointer' onClick={() => handleModalImage(card.url)}>
            <Card data={card} viewImage={handleModalImage}/>
          </GridItem>
        ))}
      </Grid>
      
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={modalImage}/>
      
    </>
  );
}
