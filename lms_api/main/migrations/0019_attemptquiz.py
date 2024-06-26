# Generated by Django 5.0.6 on 2024-05-16 15:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_coursequiz_teacher'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttemptQuiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quizquestions')),
                ('quiz', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quiz')),
                ('student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
            options={
                'verbose_name_plural': '14.Attempted Quiz Questions',
            },
        ),
    ]
