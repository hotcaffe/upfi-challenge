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
    <Modal isOpen={isOpen} isCentered onClose={() => onClose()} size="5xl">
      <ModalOverlay/>
      <ModalContent bgColor='pGray.900' maxWidth={900}>
        <ModalBody p={0} m={0}>
          <Image src={imgUrl} maxWidth={900} maxHeight={600}/>
        </ModalBody>
        <ModalFooter h="32px" justifyContent='flex-start'>
          <Link href={imgUrl} isExternal color="pGray.50" fontSize="sm">Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
