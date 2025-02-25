<?php

namespace App\Form;

use App\Entity\Question;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('questionName', TextType::class, [
                'label' => 'hola',
                'required' => true,
                'attr' => [
                    'class' => 'form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
                    'data-form-validation-target' => 'input'
                ]
            ])
            ->add('image')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);
    }
}
