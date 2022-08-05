import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: {
        value: true,
        message: 'Arquivo obrigatório'
      },
      validate: {
        lessThan10MB: file => file[0]?.size < (1000 * 1000 * 10) || 'O arquivo deve ser menor que 10MB', // 1000 * 1000 * 10 = 10MB
        acceptedFormats: file => file[0]?.type.includes('png') || file[0]?.type.includes('jpeg') || file[0]?.type.includes('gif') || 'Somente são aceitos arquivos PNG, JPEG e GIF'
      } 
    },
    title: {
      required: {
        value: true,
        message: 'Título obrigatório'
      },
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres'
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres'
      }
    },
    description: {
      required: {
        value: true,
        message: 'Descrição obrigatória'
      },
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres'
      }
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (request: Record<string, unknown>) => {
      return api.post('api/images', request)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if(!localImageUrl){
        toast({
          title: 'Imagem não adicionada',
          description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.'
        });
        return;
      }

      const newData = {
        title: data?.title,
        description: data?.description,
        url: imageUrl      
      }

      await mutation.mutateAsync(newData)

      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.'
      })
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.'
      })

    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
