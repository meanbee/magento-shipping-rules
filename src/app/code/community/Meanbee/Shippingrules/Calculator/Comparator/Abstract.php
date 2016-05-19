<?php
abstract class Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
	private $types = array();

	/**
	 * Compares the configured value to the variable value, returning the result.
	 * @param  mixed   $validValue    Admin configured value
	 * @param  mixed   $variableValue From Shipping Rate Request
	 * @param  string  $type
	 * @return boolean
	 */
	public abstract function evaluate($validValue, $variableValue, $type);

	/**
	 * Associates a type with the comparator, used to add types that the
	 * comparator can handle.
	 * @param string $typeID
	 * @return $this
	 */
	public function addType($typeID)
	{
		if (!$this->canHandleType($typeID)) {
			array_push($this->types, $typeID);
		}
		return $this;
	}

	/**
	 * Disassociates a type with the comparator.
	 * @param  string  $typeID
	 * @param  boolean $bidi   Should it also check to remove the reverse association.
	 * @return $this
	 */
	public function removeType($typeID, $bidi = true)
	{
		if ($this->canHandleType($typeID, $bidi)) {
			$this->types = array_diff($this->types, [$typeID]);
			if ($bidi) {
				$type = Meanbee_Shippingrules_Calculator_Register_Type::instance()->get($typeID);
				$comparatorID = Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->find($this);
				$type->removeComparator($comparatorID, false);
			}
		}
		return $this;
	}

	/**
	 * Checks whether the comparator is able to handle inputs of the passed type.
	 * @param  string  $typeId
	 * @param  boolean $bidi   Should it also check the reverse association.
	 * @return boolean
	 */
	public function canHandleType($typeId, $bidi = true)
	{
		if (in_array($typeId, $this->types)) {
			return true;
		}
		if ($bidi) {
			$comparatorID = Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->find($this);
			return Meanbee_Shippingrules_Calculator_Register_Type::instance()->get($typeId)->canBeHandledByComparator($comparatorID, false);
		}
		return false;
	}
}
