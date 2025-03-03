<?php

namespace App\Form;

use App\Entity\Poll;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => "Prénom de l'organisateur",
                'required' => true,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => 'Ton prénom...',
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 sm:text-sm/6',
                    'data-form-validation-target'=>'input',
                    'data-action'=>'input->form-validation#validateField'
                ]
            ])
            ->add('lastName', TextType::class, [
                'label' => "Nom de l'organisateur",
                'required' => true,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => 'Ton nom...',
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 sm:text-sm/6',
                    'data-form-validation-target'=>'input',
                    'data-action'=>'input->form-validation#validateField'
                ]
            ])
            ->add('email', TextType::class, [
                'label' => "E-mail de l'organisateur",
                'required' => true,
                'label_attr' => [
                    'class' => 'block text-sm/6 font-medium text-blue-300'
                ],
                'attr' => [
                    'placeholder' => 'Ton e-mail...',
                    'maxlength' => 50,
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 sm:text-sm/6',
                    'data-form-validation-target'=>'input',
                    'data-action'=>'input->form-validation#validateField'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
