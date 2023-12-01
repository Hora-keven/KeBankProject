from rest_framework import serializers
from django.db.models import fields
from Kebank.models import *
from Kebank.Api.number_rand import *
from datetime import datetime, timedelta

import pytz

date_actual = datetime.now(pytz.utc)
date_future = date_actual + timedelta(days=365 * 5)
fuso_horario = pytz.timezone('America/Sao_Paulo')
date_future_timezone = date_future.astimezone(fuso_horario)

class AddressSerialzer(serializers.ModelSerializer):
    class Meta:
      model = Address
      fields = "__all__"
  
class MovimentationSerializer(serializers.ModelSerializer):
    date_hour = serializers.SerializerMethodField()
    class Meta:
      model = Movimentation
      fields = "__all__"

  
    def get_date_hour(self, instance):
        return instance.date_hour.strftime('%d/%m/%Y %H:%M:%S')
      
class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = "__all__"
  
  def to_internal_value(self, data):
      
        return {
            'account': Account.objects.get(id=data['account']),
            'flag_card': 'Mastercard',
            'number': str(number_random(a=100000000000, b=1000000000000))+"0810",
            'validity': date_future_timezone.date(),
            'cvv': number_random(100, 900),  
        }

  def create(self, validated_data):
        return Card.objects.create(**validated_data)

      
class LoanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Loan
    fields = "__all__"
  
class PixSerializer(serializers.ModelSerializer):
    to_account_name = serializers.SerializerMethodField()
    from_account_name = serializers.SerializerMethodField()
    class Meta:
      model = Pix
      fields = ["to_account", "to_account_name",  "from_account", "from_account_name", "value"]

    def get_to_account_name(self, obj):
        to_account_user = getattr(obj, 'to_account', None)
        
    
      
        
        if to_account_user:
            juridic_person = to_account_user.juridic_person
            physical_person = to_account_user.physical_person
            
            if physical_person:
            
                return {'cpf': physical_person.cpf, 'name': physical_person.fk_user.first_name}
            
            elif juridic_person:
            
                return {'cnpj': juridic_person.cnpj, 'Company_name': juridic_person.fk_user.first_name}
     
        else:
            return None
        
    def get_from_account_name(self, obj):
        from_account_user = getattr(obj, 'from_account', None)
        if from_account_user:
            physical_person = from_account_user.physical_person
            juridic_person = from_account_user.juridic_person
            
            if physical_person:
            
                return {'cpf': physical_person.cpf, 'name': physical_person.fk_user.first_name}
            
            elif juridic_person:
            
                return {'cnpj': juridic_person.cnpj, 'Company_name': juridic_person.fk_user.first_name}
        
        else:
            return None
        
    def create(self, validated_data):
        to_account = validated_data.pop('to_account')  

        
        to_account_instance = Pix.objects.create(**to_account)
    
   
        validated_data['to_account'] = to_account_instance

      
    
        return to_account_instance
    
   
class AccountSerializer(serializers.ModelSerializer):
    account_card = CardSerializer(many=True, read_only=True)
  
    physical_and_juridic_name = serializers.SerializerMethodField()
    class Meta:
      model = Account
      fields = ["id","physical_and_juridic_name", "account_card", "physical_person", "agency", "number", "limit","juridic_person","number_verificate","type_account" ]

    def get_physical_and_juridic_name(self, obj):
        physical_person = getattr(obj, 'physical_person', None)
        juridic_person = getattr(obj, 'juridic_person', None)

        if physical_person:
            user = physical_person.fk_user
            return {'id': user.id, 'name': user.first_name}
        
        elif juridic_person:
            user = juridic_person.fk_user
            return {'id': user.id, 'Company_name': user.first_name}
        else:
            return None
        
    def create(self, validated_data):
        physical_person = validated_data.pop('physical_person')  
        juridic_person = validated_data.pop("juridic_person")
        
        to_account_physical_person = Account.objects.create(**physical_person)
        to_account_juridic_person = Account.objects.create(**juridic_person)
   
        validated_data['physical_person'] = to_account_physical_person
        validated_data['juridic_person'] = to_account_juridic_person
      
        return to_account_physical_person
        
        

class PhysicalPersonSerializer(serializers.ModelSerializer):
   
    user = serializers.SerializerMethodField()
  
    class Meta:
        model = PhysicalPerson
        fields = [  "cpf", "rg","born_date", "user", "fk_user"]

    def get_user(self, obj):
        user = obj.fk_user
        return {'id': user.id, 'first_name': user.first_name}

class JuridicPersonSerializer(serializers.ModelSerializer):

  
  class Meta:
        model = JuridicPerson
        fields = "__all__"
    
class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Investment
      fields = "__all__"

class CreditCardSerializer(serializers.ModelSerializer):
   class Meta:
      model=CreditCard
      fields = "__all__"

      write_only_fields = "account"
      
    
    
    
      

      
      
  

  
        
        
        
