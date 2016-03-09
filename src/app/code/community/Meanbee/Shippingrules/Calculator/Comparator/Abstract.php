<?php
abstract class Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
	private $types = array();

	/**
	 * [getLabel description]
	 * @todo
	 * @return string [description]
	 */
	public abstract function getLabel();

	/**
	 * [evaluate description]
	 * @todo
	 * @param  mixed   $validValue    [description]
	 * @param  mixed   $variableValue [description]
	 * @param  string  $type          [description]
	 * @return boolean                [description]
	 */
	public abstract function evaluate($validValue, $variableValue, $type);

	/**
	 * [addType description]
	 * @todo
	 * @param string $typeID [description]
	 */
	public function addType($typeID)
	{
		if (!$this->canHandleType($typeID)) {
			array_push($this->types, $typeID);
		}
		return $this;
	}

	/**
	 * [removeType description]
	 * @todo
	 * @param  string  $typeID [description]
	 * @param  boolean $bidi   [description]
	 * @return $this           [description]
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
	 * [canHandleType description]
	 * @todo
	 * @param  string  $typeId [description]
	 * @param  boolean $bidi   [description]
	 * @return boolean         [description]
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
