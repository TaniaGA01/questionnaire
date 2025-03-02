<?php

namespace App\Form;

use App\Entity\Poll;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
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
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 sm:text-sm/6',
                    'data-form-validation-target' => 'input',
                    'data-action'=>'keydown->form-validation#validateField'
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
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 sm:text-sm/6',
                    'data-form-validation-target' => 'input',
                    'data-action'=>'keydown->form-validation#validateField'
                ]
            ])
            ->add('expirationDate', DateType::class, [
                'label' => "Date d'expiration du questionnaire",
                'widget' => 'single_text',
                'required' => false,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => "Date d'expiration",
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
                    'data-form-validation-target' => 'input',
                    'data-action'=>'keydown->form-validation#validateField',
                    'data-action'=>'input->form-validation#validateDateField'
                ]
            ])
            ->add('questions', CollectionType::class, [
                'entry_type' => QuestionType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'prototype' => true,
                'prototype_name' => '__questions__',
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300',
                ],
                'attr'=>[
                    'data-questions-target' => 'questions',
                    'class' => 'hidden'
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
