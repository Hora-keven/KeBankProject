from rest_framework import serializers
from django.db.models import fields
from Kebank.models import *
from Kebank.Api.number_rand import *



class AddressSerialzer(serializers.ModelSerializer):

    class Meta:
      model = Address
      fields = "__all__"
  
class MovimentationSerializer(serializers.ModelSerializer):
    class Meta:
      model = Movimentation
      fields = "__all__"
      
class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = "__all__"
  
  def to_internal_value(self, data):
      
        return {
            'account': Account.objects.get(id=data['account']),
            'flag_card': 'Mastercard',
            'number': str(number_random(a=100000000000, b=1000000000000))+"0810",
            'validity': '12/2035',
            'cvv': number_random(100, 900),  
        }

  def create(self, validated_data):
       
        return Card.objects.create(**validated_data)

  
    
      
class LoanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Loan
    fields = "__all__"
  
class PixSerializer(serializers.ModelSerializer):
    class Meta:
      model = Pix
      fields = "__all__"

class AccountSerializer(serializers.ModelSerializer):
    account_card = CardSerializer(many=True, read_only=True)
    from_account = PixSerializer(many=True, read_only=True)
    class Meta:
      model = Account
      fields = "__all__"
        

class PhysicalPersonSerializer(serializers.ModelSerializer):
    legal_person_LegalPerson = AccountSerializer(many=True, read_only=True)
  
    class Meta:
        model = PhysicalPerson
        fields = "__all__"

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
      
    
    
    
      

      
      
  

  
        
        
        
