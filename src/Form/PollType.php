<?php

namespace App\Form;

use App\Entity\Poll;
use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PollType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('user', UserType::class)
            ->add('pollName', TextType::class, [
                'label' => "Nom de du questionaire",
                'required' => true,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => 'Nom du questionnaire...',
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
                ]
            ])
            ->add('description', TextareaType::class, [
                'label' => "Description",
                'required' => false,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => 'Description...',
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
                ]
            ])
            ->add('expirationDate', DateType::class, [
                'label' => "Date d'expiration du questionnaire",
                'widget' => 'single_text',
                'required' => true,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => "Date d'expiration",
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
                ]
            ])
            ->add('questions', CollectionType::class, [
                'entry_type' => QuestionType::class,
                'allow_add' => true, // Permite agregar preguntas dinámicamente
                'allow_delete' => true, // Permite eliminar preguntas
                'by_reference' => false, // Importante para relaciones ManyToOne
                'prototype' => true,
                'label' => "Questions",
                'required' => false,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ]
            ]);;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Poll::class,
        ]);
    }
}
