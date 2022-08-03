import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {

  return (
    <Modal isOpen={isOpen} isCentered onClose={() => onClose()} size="4xl">
      <ModalOverlay/>
      <ModalContent bgColor='pGray.900'>
        <ModalBody maxWidth={900} maxHeight={600}>
          <Image src={imgUrl}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
