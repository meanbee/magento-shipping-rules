<?php
abstract class Meanbee_Shippingrules_Calculator_Type_Abstract
{
	private $comparators = array();

	/**
	 * Called to sanitise the value configured in the administration ready for
	 * comparison.
	 * @param  mixed $validValue Configured value
	 * @return mixed             Sanitised value
	 */
	public abstract function sanitiseValidValue($validValue);

	/**
	 * Called to sanitise the value from the customer ready for comparison.
	 * @param  mixed $variableValue Customer value
	 * @return mixed                Sanitised value
	 */
	public abstract function sanitiseVariableValue($variableValue);

	/**
	 * Adds an association to a comparator that can handle this type.
	 * @param  string $comparatorID
	 * @return $this
	 */
	public function addComparator($comparatorID)
	{
		if (!$this->canBeHandledByComparator($comparatorID)) {
			array_push($thi->comparators, $comparatorID);
		}
		return $this;
	}

	/**
	 * Removes an association with a comparator..
	 * @todo
	 * @param  string  $comparatorID
	 * @param  boolean $bidi         Should it also remove the reverse association.
	 * @return $this
	 */
	public function removeComparator($comparatorID, $bidi = true)
	{
		if ($this->canBeHandledByComparator($comparatorID, $bidi)) {
			$this->comparators = array_diff($this->comparators, [$comparatorID]);
			if ($bidi) {
				$comparator = Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->get($comparatorID);
				$typeID = Meanbee_Shippingrules_Calculator_Register_Type::instance()->find($this);
				$comparator->removeType($typeID, false);
			}
		}
		return $this;
	}

	/**
	 * Checks whether the type can be handled by the comparator.
	 * @todo
	 * @param  string  $comparatorID
	 * @param  boolean $bidi         Should the reverse association also be checked.
	 * @return boolean
	 */
	public function canBeHandledByComparator($comparatorID, $bidi = true)
	{
		if (in_array($comparatorID, $this->comparators)) {
			return true;
		}
		if ($bidi) {
			$typeID = Meanbee_Shippingrules_Calculator_Register_Type::instance()->find($this);
			return Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->get($comparatorID)->canHandleType($typeID, false);
		}
		return false;
	}
}
